import os
import sys

# Add current directory to path
backend_dir = os.getcwd()
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

def run_smoke_tests():
    print("Running Smoke Tests...")
    
    try:
        from main import app
        print("✅ FastAPI app imported")
    except Exception as e:
        print(f"❌ FastAPI app import failed: {e}")
        return False

    try:
        from models import User
        print("✅ Models imported")
    except Exception as e:
        print(f"❌ Models import failed: {e}")
        return False

    try:
        from dependencies.auth import create_access_token
        print("✅ Auth dependencies imported")
    except Exception as e:
        print(f"❌ Auth import failed: {e}")
        return False

    print("\nAll smoke tests passed!")
    return True

if __name__ == "__main__":
    if run_smoke_tests():
        sys.exit(0)
    else:
        sys.exit(1)
