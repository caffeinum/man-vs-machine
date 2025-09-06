import logging 
from dotenv import load_dotenv
import os 


load_dotenv()

GITHUB_API_URL = os.environ.get("GITHUB_API_URL", "")

def setup_logger(name: str = __name__): 
    logging.basicConfig(level = logging.INFO, format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    logger = logging.getLogger(name)
    return logger 

