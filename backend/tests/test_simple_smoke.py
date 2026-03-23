import os
import sys

# Add backend to path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

def test_app_import():
    from main import app
    assert app is not None

def test_models_import():
    from models import User
    assert User is not None

def test_auth_import():
    from dependencies.auth import create_access_token
    assert create_access_token is not None
