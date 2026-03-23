# Quick Start Guide: Kubernetes Deployment

## Prerequisites

### Required Software
- Docker Desktop
- Minikube
- Helm
- kubectl
- kubectl-ai (AI for Kubernetes operations)
- kagent (AI agent for Kubernetes)

### Verify Installation
```bash
# Check Docker
docker --version

# Check Minikube
minikube version

# Check Helm
helm version

# Check kubectl
kubectl version --client

# Install kubectl-ai
npm install -g kubectl-ai

# Install kagent (follow official documentation)
```

## Quick Start Steps

### 1. Start Minikube Cluster
```bash
# Start local cluster with sufficient resources
minikube start --cpus=4 --memory=8192MB --driver=docker

# Enable ingress controller
minikube addons enable ingress

# Verify cluster status
kubectl get nodes
kubectl get pods -A
```

### 2. Build and Push Images
```bash
# Build backend image
cd backend
docker build -t todo-backend:latest .

# Build frontend image (create Dockerfile first)
cd ../frontend
docker build -t todo-frontend:latest .

# Load images into Minikube
minikube image load todo-backend:latest
minikube image load todo-frontend:latest
```

### 3. Deploy with Helm
```bash
# Add Helm repository if needed
helm repo add bitnami https://charts.bitnami.com/bitnami

# Install the application
helm install todo-app ./helm/todo-app \
  --set frontend.image.tag=latest \
  --set backend.image.tag=latest \
  --set database.url="your-neon-database-url" \
  --set database.secret="your-database-secret"

# Check deployment status
kubectl get pods -w
kubectl get services
```

### 4. Access the Application
```bash
# Get frontend URL
minikube service todo-app-frontend --url

# Get backend URL
minikube service todo-app-backend --url

# Test health endpoints
curl http://$(minikube service todo-app-backend --url)/api/health
```

### 5. Test AI Operations
```bash
# Use kubectl-ai for natural language commands
kubectl-ai "scale frontend to 3 replicas"

kubectl-ai "increase backend memory to 1GB"

kubectl-ai "show me all pods with issues"

# Use kagent for monitoring
kagent monitor

kagent suggest optimizations
```

## Configuration

### Environment Variables
Create a `values.yaml` file for Helm:

```yaml
# Frontend configuration
frontend:
  image:
    tag: latest
  replicas: 2
  resources:
    limits:
      cpu: 100m
      memory: 256Mi
    requests:
      cpu: 50m
      memory: 128Mi

# Backend configuration
backend:
  image:
    tag: latest
  replicas: 2
  resources:
    limits:
      cpu: 250m
      memory: 512Mi
    requests:
      cpu: 100m
      memory: 256Mi
  environment:
    DATABASE_URL: "postgresql://..."
    SECRET_KEY: "your-secret-key"
    GOOGLE_API_KEY: "your-google-api-key"

# Database configuration
database:
  url: "your-neon-database-url"
  secret: "your-database-secret"
```

### AI Tool Configuration
```bash
# Configure kubectl-ai
kubectl config set-context --current --namespace=todo-app

# Test AI commands
kubectl-ai "deploy the chatbot service"
kubectl-ai "scale services based on CPU usage"
```

## Troubleshooting

### Common Issues

1. **Pods not starting**
   ```bash
   # Check pod status
   kubectl describe pod <pod-name>

   # Check logs
   kubectl logs <pod-name>
   ```

2. **Images not found**
   ```bash
   # Verify images loaded
   minikube image ls

   # Rebuild if needed
   minikube image load <image-name>
   ```

3. **Service not accessible**
   ```bash
   # Check services
   kubectl get services

   # Check ingress
   kubectl get ingress
   minikube tunnel
   ```

### Debug Commands
```bash
# Enter pod for debugging
kubectl exec -it <pod-name> -- bash

# Port forward for local access
kubectl port-forward service/<service-name> <local-port>:<pod-port>

# View all resources
kubectl get all -n todo-app
```

## Development Workflow

### Local Development
```bash
# Run with Docker Compose
docker-compose up -d

# Access at http://localhost:3000
```

### Kubernetes Development
```bash
# Update images
docker build -t todo-frontend:dev ./frontend
minikube image load todo-frontend:dev
helm upgrade todo-app ./helm/todo-app --set frontend.image.tag=dev

# Watch for changes
kubectl get pods -w
```

### AI-Assisted Development
```bash
# Get AI suggestions for optimization
kubectl-ai "suggest improvements for performance"

# Debug issues with AI help
kubectl-ai "why are pods failing to start?"

# Generate manifests with AI
kubectl-ai "generate deployment manifest for frontend with auto-scaling"
```

## Cleanup

### Remove Deployment
```bash
# Uninstall Helm release
helm uninstall todo-app

# Stop Minikube
minikube stop

# Delete cluster (optional)
minikube delete
```

### Reset Environment
```bash
# Clean up Docker images
docker rmi todo-backend:latest todo-frontend:latest

# Clean up local state
rm -rf helm/todo-app/charts/
```

## Next Steps

1. **Customize Helm Charts**: Modify `helm/todo-app/values.yaml` for your needs
2. **Add Monitoring**: Integrate Prometheus/Grafana with kagent
3. **CI/CD Pipeline**: Set up automated builds and deployments
4. **Production Setup**: Configure for cloud providers (AWS EKS, GKE, AKS)

## Resources

- [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [kubectl-ai GitHub](https://github.com/chainloop-dev/kubectl-ai)
- [kagent Documentation](https://github.com/kubestellar/kagent)