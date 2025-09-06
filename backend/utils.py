import aiohttp 
from aiohttp.client_exceptions import ClientConnectionError
from config import setup_logger
from fastapi.exceptions import HTTPException
from github import Github

logger = setup_logger(__name__)

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
        


# class Git: 
#     def __init__()