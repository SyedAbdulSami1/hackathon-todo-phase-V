---
name: pytest
description: Runs and interprets pytest suites for Python projects. Use when a user needs to execute tests, debug failures, or analyze test coverage, especially for FastAPI/SQLModel applications.
---

# Pytest Skill

## Overview
This skill provides a standardized workflow for running and interpreting tests using `pytest`. It is optimized for FastAPI applications with SQLModel/SQLAlchemy.

## Workflow
1.  **Preparation**: Ensure the current directory is the root of the Python project (e.g., `backend/`).
2.  **Execution**: Run `pytest` with appropriate flags.
    - `-v` for verbose output.
    - `-s` to see print statements.
    - `-k "test_name"` to run specific tests.
    - `--cov` for coverage reports.
3.  **Analysis**:
    - **401/403 Errors**: Check auth middleware, JWT generation, and hashing.
    - **DB Errors**: Check migrations, table schemas, and session handling.
    - **Assertion Errors**: Compare expected vs. actual values.

## Common Commands
- Run all tests: `pytest`
- Run specific file: `pytest tests/test_auth.py`
- Run with coverage: `pytest --cov=.`
- Debugging: `pytest -s -v`

## Project Specifics
- **Config**: `backend/pytest.ini`
- **Path**: `backend/` is the base for test discovery.
- **Dependencies**: `backend/requirements.txt`
