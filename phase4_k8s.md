# Spec: Kubernetes Local Deployment
- **Tool:** Helm v3
- **Platform:** Minikube
- **Components:** 
  - Frontend (Next.js) -> Port 3000
  - Backend (FastAPI) -> Port 8000
  - DB (Neon/External or local Postgres pod)
- **Scaling:** 2 replicas for backend.
