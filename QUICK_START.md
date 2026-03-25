# 🎯 QUICK START - Docker Deployment

## For Classmates/CR

### 1. Get Docker Images
```bash
# Replace YOUR_USERNAME with actual Docker Hub username
docker pull YOUR_USERNAME/todo-backend:latest
docker pull YOUR_USERNAME/todo-frontend:latest
```

### 2. Run Containers
```bash
# Backend
docker run -d -p 8000:8000 \
  -e DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require \
  -e JWT_SECRET=your-secret-key \
  -e GOOGLE_API_KEY=your-api-key \
  YOUR_USERNAME/todo-backend:latest

# Frontend
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  YOUR_USERNAME/todo-frontend:latest
```

### 3. Access Application
Open browser: **http://localhost:3000**

---

## For Project Owner (Tomorrow's Task)

### Build & Push (5-10 minutes)

```bash
# 1. Build Frontend
cd "d:\D Data\Hackthon-Second\hackathon-todo-phase-V\frontend"
docker build -f Dockerfile.prod -t todo-frontend:latest .

# 2. Login to Docker Hub
docker login

# 3. Tag & Push
set DOCKER_USERNAME=yourusername
docker tag todo-backend:latest %DOCKER_USERNAME%/todo-backend:latest
docker tag todo-frontend:latest %DOCKER_USERNAME%/todo-frontend:latest
docker push %DOCKER_USERNAME%/todo-backend:latest
docker push %DOCKER_USERNAME%/todo-frontend:latest
```

### Share with Class:
- Docker Hub Username: `yourusername`
- Images: `yourusername/todo-backend:latest`, `yourusername/todo-frontend:latest`
- Guide: `DOCKER_GUIDE.md`

---

## Project Info

- **Phase:** V (Complete)
- **Tests:** 60/60 Passing (100%)
- **Features:** Priorities, Tags, Search/Filter/Sort, Recurring Tasks, AI Chat
- **Stack:** Next.js + FastAPI + Neon PostgreSQL + Google Gemini

---

## Quick Links

- Full Guide: `DOCKER_GUIDE.md`
- Checklist: `DOCKER_CHECKLIST.md`
- Docker Compose: `docker-compose.classmate.yml`
