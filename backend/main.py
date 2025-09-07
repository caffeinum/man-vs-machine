from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions
from fastapi import FastAPI, Request, Query, Header, Depends, status

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config import setup_logger

from utils import get_all_issues, get_repo_path, serialize_issue
from dotenv import load_dotenv




load_dotenv()

logger = setup_logger(__name__)


app = FastAPI(title = "Agent Kanban", description = "Kanban for handling github issues")
app.add_middleware(CORSMiddleware,
                    allow_origins = ["*"], 
                    allow_credentials=True,
                    allow_methods=["*"],
                    allow_headers=["*"],
                )
bearer_scheme = HTTPBearer(auto_error=False)

@app.get("/")
def root():
    logger.info("Backend is Running")
    return {"message": "Backend is running successfully"}



@app.get("/health")
def health(request: Request): 
    keys = [key.lower() for key in request.headers.keys()]
    if "authorization" not in keys: 
        raise HTTPException(500, "Invalid authorization")
    return {"status": "success", "message": "ok"}

def extract_token(cred: HTTPAuthorizationCredentials | None,  authorization: str | None) -> str:
    raw = cred.credentials if cred else (authorization or "")
    raw = raw.strip()
    for prefix in ("Bearer ", "bearer ", "Token ", "token "):
        if raw.startswith(prefix):
            return raw[len(prefix):].strip()
    return raw

@app.get("/{user}/{repo}/issues")
def fetch_issues(
    user: str,
    repo: str,
    is_open: bool = Query(True, description="Filter issues by open state"),
    cred: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    authorization: str | None = Header(None),
) -> dict:
    token = extract_token(cred, authorization)
    repo_name = get_repo_path(user, repo)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing or invalid",
        )

    all_issues = []
    try:
        logger.info(f"REPO: {repo}, USER: {user}")
        issues = get_all_issues(repo_name, token, is_open)
        for issue in issues: 
            all_issues.append(serialize_issue(issue))

        return {"status": "success", "message": all_issues}
    except Exception as e:
        logger.error(f"Failed to fetch issues for {user}: {e}")
        return {"status": "failed", "message": []}






async def summarize_issue(repo_name: str, issue_number: str): 
    prompt = """
    You are a summarizer. You will be provided with an issue and your task is to summarize 
    what the issue is, what files is or will be affected. 

    """

    async with ClaudeSDKClient(
        options=ClaudeCodeOptions(
            system_prompt=prompt,
            allowed_tools=["Bash", "Read", "WebSearch"],
            max_turns=5
        )
    ) as client:
        query = f"""Analyze the given github issue #{issue_number} in the {repo_name} repository
        Summarize the content in less than 200 words"""
        await client.query(query)
        async for message in client.receive_response():
            if hasattr(message, 'content'):
                for block in message.content:
                    if hasattr(block, 'text'):
                        print(block.text, end='', flush=True)



@app.post("/{user}/{repo}/agents/{id}")
async def create_agent(
    user: str,
    repo: str,
    id: int,
    cred: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    authorization: str | None = Header(None),
) -> dict:
    token = extract_token(cred, authorization)
    repo_name = get_repo_path(user, repo)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing or invalid",
        )

    # clone repo if not exists

    # cd into the repo

    # Run as script
    summary = await summarize_issue(repo_name=repo_name,issue_number=id)

    return {"status": "success", "message": summary}

