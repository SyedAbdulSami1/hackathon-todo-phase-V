# PROJECT_CONTEXT.md – Hackathon II (Phase V - COMPLETED)

## CURRENT_STATUS
- **Phase:** V (Advanced Cloud Deployment) - **COMPLETED** ✅
- **Completed:** I (Console), II (Web), III (Chatbot), IV (K8s), V (Advanced Features)
- **Goal:** Implement advanced features and deploy to cloud. ✅
- **Status:** All features working. Login fixed. Tests passing (94%).

## ARCHITECTURE (DO NOT CHANGE)
- **Frontend:** Next.js 16+ (Phase II/III)
- **Backend:** FastAPI + OpenAI Agents SDK + Google Gemini (Phase III/V)
- **DB:** Neon PostgreSQL
- **Infra:** Docker, Minikube, Helm, kubectl-ai
- **Advanced Features:** Priorities, Tags, Search/Filter/Sort, Recurring Tasks, Due Dates/Reminders

## FILE STRUCTURE (SOURCE OF TRUTH)
- `/frontend` → Next.js app
- `/backend` → FastAPI app with advanced features
- `/specs` → All spec files (SDD Required)
- `/helm` → Helm charts (todo-app)
- `/k8s` → Raw manifests
- `/reports` → Test reports (pytest-phase5.txt)
- `/api` → Vercel Serverless Functions

## DEPLOYMENT STATE (Phase IV)
- **Minikube:** Installed and running (driver: docker)
- **Docker Images:**
  - `todo-backend:latest` (Python 3.10-slim, multi-stage)
  - `todo-frontend:latest` (node:18-alpine, multi-stage, standalone output)
- **Helm Release:** `todo-app` (namespace: todo-app)
- **Backend Replicas:** 2 (as per spec)
- **Frontend Replicas:** 2
- **AI Model:** `gemini-2.5-flash` (updated from deprecated `gemini-1.5-flash`)

## TASK TRACKER (Phase IV)
- [x] Dockerfile (Backend/Frontend)
- [x] Helm Charts (Backend/Frontend)
- [x] K8s Manifests (Deployments, Services, Secrets)
- [x] Documentation (k8s/README.md)
- [x] Final Deployment Validation & Pytest
- [x] Pytest report saved to `/reports/pytest-phase4.xml`

## PYTEST RESULTS (Phase IV)
- **Total Tests:** 66
- **Passed:** 64
- **Failed:** 2 (integration chat endpoint - conversation_id type issue)
- **Success Rate:** 97%
- **Report Location:** `/reports/pytest-phase4.xml`

## POST-PHASE RULES (CRITICAL)
1. **Pytest Requirement:** ✅ Completed - 64/66 tests passing
2. **Report Saving:** ✅ Saved in `/reports/pytest-phase4.xml`
3. **No Manual Code:** All fixes must be spec-driven.
4. **AIOps:** Use `kubectl-ai` or `kagent` for cluster checks.

## NOTES FOR AI
- Trust this file over scanning directory.
- Do not recreate existing files (check list above).
- Focus on **Deployment Stability** and **Testing Proof**.
- Phase IV is complete. Phase V will be done in a separate project.