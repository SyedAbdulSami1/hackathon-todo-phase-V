"""
Start backend server with .env loaded
"""
import os
import sys
from dotenv import load_dotenv
import uvicorn

# Load .env file
env_path = os.path.join(os.path.dirname(__file__), 'backend', '.env')
load_dotenv(env_path)

print(f"Loaded .env from: {env_path}")
print(f"DATABASE_URL set: {os.getenv('DATABASE_URL') is not None}")

# Run uvicorn
if __name__ == "__main__":
    uvicorn.run(
        "backend.index:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
