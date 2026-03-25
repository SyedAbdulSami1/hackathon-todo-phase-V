# 🐳 Docker Deployment Guide - Hackathon Todo App Phase V

## For Classmates/Teacher - Quick Setup

### Prerequisites
- Docker Desktop installed
- Docker Hub account (free)

### Step 1: Get Docker Images

**Option A: Pull from Docker Hub (Recommended)**

```bash
# Replace YOUR_USERNAME with the Docker Hub username provided
docker pull YOUR_USERNAME/todo-backend:latest
docker pull YOUR_USERNAME/todo-frontend:latest
```

**Option B: Build Locally (if you have the project)**

```bash
# Build backend
docker build -t todo-backend:latest -f backend/Dockerfile backend/

# Build frontend
docker build -t todo-frontend:latest -f frontend/Dockerfile frontend/
```

### Step 2: Run with Docker Compose (Easiest)

1. Edit `docker-compose.classmate.yml`:
   - Replace `YOUR_DOCKER_USERNAME` with actual username
   - Update `DATABASE_URL` with your Neon DB connection string
   - Update `GOOGLE_API_KEY` with your Gemini API key

2. Run:
```bash
docker-compose -f docker-compose.classmate.yml up -d
```

3. Access app at: http://localhost:3000

### Step 3: Run Manually (Alternative)

```bash
# Create network
docker network create todo-network

# Run backend
docker run -d \
  --name todo-backend \
  --network todo-network \
  -p 8000:8000 \
  -e DATABASE_URL=your_database_url \
  -e JWT_SECRET=your_secret_key \
  -e GOOGLE_API_KEY=your_api_key \
  YOUR_USERNAME/todo-backend:latest

# Wait for backend to start
timeout /t 10

# Run frontend
docker run -d \
  --name todo-frontend \
  --network todo-network \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  -e NEXT_PUBLIC_CHAT_ENABLED=true \
  YOUR_USERNAME/todo-frontend:latest
```

### Step 4: Verify Deployment

```bash
# Check containers are running
docker ps

# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000
```

### Step 5: Stop and Cleanup

```bash
# Stop containers
docker-compose -f docker-compose.classmate.yml down

# Or manually
docker stop todo-backend todo-frontend
docker rm todo-backend todo-frontend
```

---

## For Project Owner - Building and Sharing Images

### Build Images

```bash
# Build backend image
docker build -t todo-backend:latest -f backend/Dockerfile backend/

# Build frontend image  
docker build -t todo-frontend:latest -f frontend/Dockerfile frontend/
```

### Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag images with your Docker Hub username
docker tag todo-backend:latest yourusername/todo-backend:latest
docker tag todo-frontend:latest yourusername/todo-frontend:latest

# Push images
docker push yourusername/todo-backend:latest
docker push yourusername/todo-frontend:latest
```

### Verify Upload

```bash
# Check images on Docker Hub
docker search yourusername/todo-
```

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require
JWT_SECRET=your-secret-key-change-this
GOOGLE_API_KEY=your-google-api-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CHAT_ENABLED=true
```

---

## Troubleshooting

### Backend Won't Start
```bash
# Check logs
docker logs todo-backend

# Common issues:
# - DATABASE_URL not set or invalid
# - GOOGLE_API_KEY missing
# - Port 8000 already in use
```

### Frontend Won't Start
```bash
# Check logs
docker logs todo-frontend

# Common issues:
# - Backend not running
# - NEXT_PUBLIC_API_URL incorrect
# - Port 3000 already in use
```

### Connection Refused
```bash
# Make sure both containers are on same network
docker network ls
docker network inspect todo-network

# Check firewall settings
# Ensure ports 3000 and 8000 are open
```

---

## Testing

### Run Tests Inside Container

```bash
# Backend tests
docker run --rm todo-backend:latest python -m pytest tests/ -v

# Frontend tests
docker run --rm todo-frontend:latest npm test
```

### Health Checks

```bash
# Backend health
curl http://localhost:8000/health

# API documentation
curl http://localhost:8000/docs
```

---

## Project Information

- **Phase:** V (Complete)
- **Tests:** 60/60 Unit Tests Passing (100%)
- **Features:** Priorities, Tags, Search/Filter/Sort, Recurring Tasks, Due Dates, AI Chat
- **Tech Stack:** Next.js + FastAPI + Neon PostgreSQL + Google Gemini

---

## Support

For issues or questions:
1. Check logs: `docker logs <container-name>`
2. Verify environment variables are set correctly
3. Ensure Docker Desktop is running
4. Check ports 3000 and 8000 are not in use
