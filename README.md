# AI-Powered Todo Chatbot (Hackathon Phase IV)

A premium, startup-quality Todo application featuring an AI Chatbot powered by Google Gemini and MCP (Model Context Protocol) for task management. **Now containerized and deployed on Kubernetes!**

## 🏆 Hackathon Progress
- ✅ **Phase I:** In-Memory Python Console App
- ✅ **Phase II:** Full-Stack Web Application
- ✅ **Phase III:** AI-Powered Todo Chatbot
- ✅ **Phase IV:** Local Kubernetes Deployment **(COMPLETED)**
- 🔜 **Phase V:** Advanced Cloud Deployment (Next project)

## 📍 Current Status (Deployment Debugging)
- **Localhost:** 🟢 **PERFECT.** Everything (Login, Register, AI Chat, Tasks) works flawlessly on local machine and Kubernetes (Minikube).
- **Vercel Deployment:** ⚠️ **IN PROGRESS.** Frontend is live, but API routes (`/api/*`) are returning **404 Not Found**.

### 🔍 Vercel Debugging Log (Session: March 18, 2026)
We spent the session troubleshooting the Vercel 404 error for Python Serverless Functions.

**Failed Attempts (Do not repeat):**
1.  **Config Tweaking:** Multiple variations of `vercel.json` (builds, rewrites, functions) and `next.config.js` rewrites.
2.  **File Restructuring:** Moving the `api/` folder to `backend/api/`, renaming `index.py` to `main.py`, and vice-versa.
3.  **Path Logic:** Adding robust `sys.path` and `os.path` resolution in `api/index.py`.

**Key Observations:**
- The root `package.json` has a custom build script that manually moves folders. This might be confusing Vercel's automatic function detection.
- The project structure is a hybrid (Next.js + Python) being treated as a single Vercel project instead of a Monorepo.

**Plan for Next Session:**
- Inspect Vercel's "Root Directory" settings in the dashboard.
- Investigate if `.vercelignore` is blocking the `api/` folder.
- Consider moving to a standard Vercel Monorepo structure or bridging API through Next.js routes.

## 🚀 Recent Updates & Fixes
- **✅ Phase IV Deployment:** Containerized frontend & backend with Docker multi-stage builds.
- **✅ Kubernetes Ready:** Helm charts for Minikube deployment with 2 replicas (backend & frontend).
- **✅ Fixed 500 Errors:** Resolved a critical bug where a folder named `logging` shadowed the standard library.
- **✅ Database Consistency:** Updated `Conversation` model `user_id` to `int` to match the `users` table.
- **✅ Verified Tests:** 64/66 backend tests passing (97% success rate).

## 🛠️ Local Setup (Works Perfect)

### Option 1: Traditional Setup

#### Backend (FastAPI)
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn index:app --reload --port 8000
```

#### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Access at `http://localhost:3000`.

### Option 2: Kubernetes Deployment (Phase IV)
```bash
minikube start --driver=docker
# Build and load images
docker build -t todo-backend:latest -f backend/Dockerfile backend/
docker build -t todo-frontend:latest -f frontend/Dockerfile frontend/
minikube image load todo-backend:latest
minikube image load todo-frontend:latest
# Deploy
helm install todo-app helm/todo-app --namespace todo-app --create-namespace
# Port forward
kubectl port-forward service/todo-app-frontend 3000:3000 -n todo-app
```

## 🧪 Testing Report
**Status:** 🟢 PASSING (64/66 Tests - 97%)

Full report in `reports/pytest-phase4.xml`.

## 📂 Project Structure
- `frontend/`: Next.js application.
- `backend/`: FastAPI application.
- `api/`: Vercel Serverless Function entry point.
- `helm/todo-app/`: Helm charts.
- `specs/`: Project specifications.

## 📝 Documentation
- [Phase IV Spec](specs/004-kubernetes-deployment/spec.md)
- [Project Context](PROJECT_CONTEXT.md)
- [Change History](HISTORY.md)
