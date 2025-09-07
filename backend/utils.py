import aiohttp 
from aiohttp.client_exceptions import ClientConnectionError
from config import setup_logger
from fastapi.exceptions import HTTPException
from github import Github, PaginatedList, GithubException, Auth, Issue
from datetime import datetime
from typing import Optional, Literal, List
from pydantic import BaseModel, AnyUrl

logger = setup_logger(__name__)

class IssueOut(BaseModel):
    id: int
    number: int
    title: str
    state: Literal["open", "closed"]
    html_url: AnyUrl
    user: Optional[str] = None
    labels: List[str] = []
    assignees: List[str] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

def serialize_issue(iss: Issue) -> IssueOut:
    if not iss: 
        return  
    
    return IssueOut(
        id=iss.id,
        number=iss.number,
        title=iss.title,
        state=iss.state,
        html_url=iss.html_url,
        user=(iss.user.login if iss.user else None),
        labels=[l.name for l in iss.labels or []],
        assignees=[a.login for a in iss.assignees or []],
        created_at=iss.created_at,
        updated_at=iss.updated_at,
    )

def get_repo_path(owner: str, repo_name: str): 
    return f"{owner}/{repo_name}"

async def make_request(url: str, headers: dict, method: str, data: dict | None = None, params: dict | None = None): 

    try: 
        async with (aiohttp.ClientSession() as client, client.request(method = method, headers = headers, json = data, params = params, timeout = aiohttp.ClientTimeout(30.0)) as response):
            if not response.ok: 
                msg = await response.text()
                logger.error(f"Failed to make request to {url}: {msg}")
                raise HTTPException(500, "Failed to fetch response")
            
            if response.status == 204: 
                return {"status": "success"}
            
            return await response.json()

    except ClientConnectionError as e:
        logger.error(f"Failed to make request to {url}: {e}")
        raise 
    
    except Exception as e: 
        logger.error(f"Unknown error: {e}")
        raise 
        

def get_all_issues(repo_name: str, access_token: str, is_open: bool = False) -> PaginatedList:
    
    auth = Auth.Token(access_token)
    git = Github(auth = auth)
    logger.info(f"Fetching the issues for {repo_name}")
    
    try: 
        repo = git.get_repo(repo_name)

        if not is_open:  
            issues = repo.get_issues(state = "all")
            logger.info(issues[0])
            return issues     
        return repo.get_issues(state = "open")

    except GithubException as e: 
        raise Exception(f"Failed to fetch the issues: {e}")
