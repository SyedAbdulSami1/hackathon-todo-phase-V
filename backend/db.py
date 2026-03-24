from sqlmodel import SQLModel, create_engine, Session
import os

# Import all models to register them with SQLModel
from models import User, Task, Conversation, Message

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# SQLAlchemy requires postgresql:// instead of postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Ensure SSL mode for Neon DB on Vercel if not specified
if "neon.tech" in DATABASE_URL and "sslmode" not in DATABASE_URL:
    if "?" in DATABASE_URL:
        DATABASE_URL += "&sslmode=require"
    else:
        DATABASE_URL += "?sslmode=require"

# Create SQLModel engine with better connection settings for Neon
engine_params = {
    "echo": False,  # Reduce logging noise
    "pool_pre_ping": True,  # Enable connection health checks
    "pool_recycle": 300,  # Recycle connections every 5 minutes
}

# Only add pool_size and max_overflow for non-sqlite databases
if not DATABASE_URL.startswith("sqlite"):
    engine_params.update({
        "pool_size": 3,  # Reduced from 5 for Neon free tier
        "max_overflow": 5,  # Reduced from 10
    })
else:
    # Special handling for SQLite
    engine_params["connect_args"] = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, **engine_params)

def get_session():
    """Dependency to get database session"""
    with Session(engine) as session:
        yield session


def create_db_and_tables():
    """Create database tables for all registered models"""
    print("DEBUG: Starting create_db_and_tables...")
    try:
        SQLModel.metadata.create_all(engine)
        print("DEBUG: create_db_and_tables completed successfully")
    except Exception as e:
        print(f"DEBUG: ERROR in create_db_and_tables: {str(e)}")
        import traceback
        traceback.print_exc()
        # Don't re-raise here to allow the app to start even if migration fails
        # (might already exist)
