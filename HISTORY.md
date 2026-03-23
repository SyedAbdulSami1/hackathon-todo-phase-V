# HISTORY.md – Phase IV Change Log

## [2026-03-22] [PHASE-IV-FIX] - AI Chatbot Gemini Model Update

### Summary
Fixed AI Chatbot 404 error caused by deprecated Gemini model.

### Problem
- **Error**: `models/gemini-1.5-flash is not found` (404 NOT_FOUND)
- **Cause**: Google deprecated all Gemini 1.5 models in September 2026
- **Impact**: AI Chatbot completely non-functional on Vercel

### Changes:
1. **Model Migration**:
   - FROM: `gemini-1.5-flash` (deprecated)
   - TO: `gemini-2.5-flash` (stable, production-ready)

2. **Files Updated**:
   - `backend/agents/chat_agent.py` - Updated default model name
   - `helm/todo-app/values.yaml` - Updated AGENT_MODEL_NAME (2 locations)
   - `backend/tests/unit/test_agents.py` - Updated test assertion

### Spec Files:
- `/specs/deployment/fix-gemini-model-404.spec.md`

### Manual Step Required:
User must update Vercel Environment Variable:
- **Variable**: `AGENT_MODEL_NAME`
- **Value**: `gemini-2.5-flash`

### Notes:
- No breaking changes to API or database
- Model change is backward compatible
- Alternative: `gemini-3-flash` (preview) can be used

---

## [2026-03-12] [PHASE-IV] - Kubernetes Deployment Complete

### Summary
Successfully completed Phase IV: Local Kubernetes Deployment

### Changes:
1. **Docker Images Built:**
   - `todo-backend:latest` - Updated to Python 3.10-slim (was 3.9) for mcp package compatibility
   - `todo-frontend:latest` - Added `output: 'standalone'` to next.config.js

2. **Minikube Cluster:**
   - Installed Minikube v1.35.2 (standalone executable)
   - Started cluster with Docker driver
   - Loaded both Docker images into Minikube

3. **Helm Deployment:**
   - Deployed `todo-app` Helm chart to `todo-app` namespace
   - Backend: 2 replicas (as per spec)
   - Frontend: 2 replicas
   - Configured with Neon PostgreSQL external DB

4. **Pytest Results:**
   - Total: 66 tests
   - Passed: 64 (97%)
   - Failed: 2 (integration chat endpoint - conversation_id type issue)
   - Report saved: `/reports/pytest-phase4.xml`

### Spec Files:
- `/specs/004-kubernetes-deployment/spec.md`

### Artifacts:
- `/helm/todo-app/` - Complete Helm chart
- `/reports/pytest-phase4.xml` - Test report
- `/reports/pytest-phase4-full.log` - Full test output

### Notes:
- Phase IV is complete
- Phase V will be done in a separate project (as per teacher requirements)
