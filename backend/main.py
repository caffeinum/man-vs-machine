from fastapi import FastAPI, Request
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config import (setup_logger, GITHUB_API_URL as URL
                                  )
from pydantic import BaseModel
# from utils import make_request, get_repo_path
from dotenv import load_dotenv




load_dotenv()
class GithubRequest(BaseModel): 
    user_name: str 
    repo_name: str 


logger = setup_logger(__name__)


app = FastAPI(title = "Agent Kanban", description = "Kanban for handling github issues")
app.add_middleware(CORSMiddleware,
                    allow_origins = ["*"], 
                    allow_credentials=True,
                    allow_methods=["*"],
                    allow_headers=["*"],
                )

@app.get("/")
def status():
    logger.info("Backend is Running")
    return {"message": "Backend is running successfully"}



@app.get("/health")
def health(request: Request): 
    keys = [key.lower() for key in request.headers.keys()]
    if "authorization" not in keys: 
        raise HTTPException(500, "Invalid authorization")
    return {"status": "success", "message": "ok"}


# @app.get("/{user}/{repo}/issues")
# def fetch_issues(request: GithubRequest):
#     """
#     Fetches all the issues
#     """
#     repo_path = get_repo_path(request.user_name, request.repo_name)
#     url = f"{URL}/repos/{repo_path}"

#     response = make_request()    
#     return {"header": headers}







