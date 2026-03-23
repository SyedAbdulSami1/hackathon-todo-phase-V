# Quick Start: Local Kubernetes Deployment

This guide helps you deploy the Todo application on a local Kubernetes cluster using Phase IV implementation.

## Prerequisites

1. **Install Docker Desktop** with Kubernetes enabled
2. **Install kubectl**:
   ```bash
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/windows/amd64/kubectl.exe"
   ```
3. **Install Helm**:
   ```bash
   choco install kubernetes-helm
   ```
4. **Install AI tools**:
   ```bash
   # Install kubectl-ai
   pip install kubectl-ai

   # Install kagent (if available)
   # Follow installation instructions from kagent documentation
   ```

## Setup Steps

### 1. Start Minikube (if not using Docker Desktop Kubernetes)

```bash
minikube start --memory=4g --cpus=4 --disk-size=20g
```

### 2. Build Container Images

```bash
# Build frontend image
docker build -f frontend/Dockerfile -t todo-frontend:latest ./frontend

# Build backend image
docker build -f backend/Dockerfile -t todo-backend:latest ./backend
```

### 3. Push Images to Registry (Optional but Recommended)

```bash
# Tag images
docker tag todo-frontend:latest your-registry/todo-frontend:latest
docker tag todo-backend:latest your-registry/todo-backend:latest

# Push to registry
docker push your-registry/todo-frontend:latest
docker push your-registry/todo-backend:latest
```

### 4. Deploy to Kubernetes

```bash
# Install Helm charts
helm install todo-frontend ./k8s/frontend/ -n todo --create-namespace
helm install todo-backend ./k8s/backend/ -n todo
helm install todo-database ./k8s/database/ -n todo
```

### 5. Verify Deployment

```bash
# Check pod status
kubectl get pods -n todo

# Check service status
kubectl get services -n todo

# Get frontend URL
kubectl get ingress -n todo
```

## AI-Powered Operations Examples

### Scale Frontend with AI
```bash
# Using kubectl-ai
kubectl-ai "scale todo-frontend deployment to 3 replicas"
```

### Debug with AI
```bash
# Using kagent for debugging
kagent "why is the backend pod failing?"
```

### Optimize Resources
```bash
# AI-assisted optimization
kubectl-ai "optimize resource allocation for todo application"
```

## Access the Application

1. **Frontend**: Access through the Ingress URL (check with `kubectl get ingress -n todo`)
2. **API**: Access at `http://<ingress-url>/api`

## Monitoring and Logs

```bash
# View logs
kubectl logs -f deployment/todo-frontend -n todo
kubectl logs -f deployment/todo-backend -n todo

# View pod status
kubectl describe pod -n todo

# Check health
kubectl get pods -n todo --watch
```

## Common Commands

```bash
# List all resources
kubectl get all -n todo

# Delete deployment
helm uninstall todo-frontend -n todo
helm uninstall todo-backend -n todo
helm uninstall todo-database -n todo

# Stop Minikube
minikube stop
```

## Troubleshooting

### Pod Issues
```bash
# Check pod details
kubectl describe pod <pod-name> -n todo

# Check pod logs
kubectl logs <pod-name> -n todo
```

### Image Pull Issues
```bash
# Check image pull secrets
kubectl get secrets -n todo

# Update image pull secret
kubectl patch secret regcred -n todo --type='json' -p='[{"op": "replace", "path": "/data/.dockerconfigjson", "value": "'$(echo -n '{"auths":{"your-registry": {"username":"user","password":"pass","email":"email"}}}' | base64 -w0)'" }]'
```

### Network Issues
```bash
# Check services
kubectl get services -n todo

# Check endpoints
kubectl get endpoints -n todo
```

## Next Steps

1. **Test the application**: Add tasks, mark complete, use chatbot
2. **Test scaling**: Use AI commands to scale components
3. **Test rollback**: Deploy a new version and test rollback
4. **Test persistence**: Restart pods and verify data persists

## Cleanup

```bash
# Delete all resources
helm uninstall todo-frontend -n todo
helm uninstall todo-backend -n todo
helm uninstall todo-database -n todo

# Delete namespace
kubectl delete namespace todo

# Stop cluster
minikube stop
```