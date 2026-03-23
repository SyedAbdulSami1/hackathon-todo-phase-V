# Data Model for Kubernetes Deployment

## Entities Overview

### 1. Kubernetes Entities

#### Namespace
- **Name**: todo-app
- **Purpose**: Isolate deployment resources

#### Services
- **Frontend Service**: Exposes Next.js app on port 3000
- **Backend Service**: Exposes FastAPI app on port 8000
- **Database Service**: External Neon PostgreSQL (no K8s service needed)

#### Deployments
- **Frontend Deployment**: Manages Next.js pods
- **Backend Deployment**: Manages FastAPI pods
- **Database**: External service via connection string

#### ConfigMaps & Secrets
- **ConfigMap**: Environment variables for non-sensitive data
- **Secrets**: Database credentials, API keys, JWT secrets

### 2. Application Entities (Existing)

#### Users
- **Fields**: id, email, hashed_password, created_at
- **Storage**: Neon PostgreSQL (existing)

#### Tasks
- **Fields**: id, user_id, title, description, completed, created_at, updated_at
- **Storage**: Neon PostgreSQL (existing)

#### Chat Conversations
- **Fields**: id, user_id, message, role, timestamp
- **Storage**: Neon PostgreSQL (Phase III addition)

#### Chat Tool Results
- **Fields**: id, user_id, tool_name, tool_args, tool_result, timestamp
- **Storage**: Neon PostgreSQL (Phase III addition)

### 3. Kubernetes Resource Model

#### Pod Specifications
- **Frontend Pods**:
  - Image: todo-frontend:latest
  - Resources: 256MB memory, 100m CPU
  - Health checks: HTTP on /health
  - Environment: ConfigMap + Secret mounts

- **Backend Pods**:
  - Image: todo-backend:latest
  - Resources: 512MB memory, 250m CPU
  - Health checks: HTTP on /api/health
  - Environment: ConfigMap + Secret mounts

#### Volumes & Persistence
- **ConfigMap**: Application configuration
- **Secrets**: Sensitive data
- **Persistent Volumes**: Not required (external database)

### 4. AI Operations Model

#### kubectl-ai Integration
- Natural language commands for scaling
- Example: "scale frontend to 3 replicas"
- Example: "increase backend memory limit to 1GB"

#### kagent Integration
- Automated monitoring and scaling
- Anomaly detection in logs
- Performance optimization suggestions

### 5. Network Model

#### Ingress Configuration
- **Path**: /api -> backend service
- **Path**: /* -> frontend service
- **TLS**: Self-signed certificates for local development

#### Network Policies
- Allow frontend to backend communication
- Restrict direct database access
- Allow health check probes

### 6. Security Model

#### Service Accounts
- **Frontend ServiceAccount**: Limited permissions
- **Backend ServiceAccount**: Database access + external API calls

#### RBAC (if needed)
- Minimal permissions for service accounts
- Read-only access to metrics

#### Secrets Management
- Kubernetes Secrets for external credentials
- Encrypted at rest with Kubernetes encryption

### Validation Rules

1. **Database Connection**: Always use connection string from secret
2. **JWT Validation**: Validate tokens before processing requests
3. **User Isolation**: All queries must filter by user_id
4. **Health Checks**: Must pass for pod readiness
5. **Resource Limits**: Enforce memory/CPU limits
6. **Network Policies**: Follow least privilege principle

### State Transitions

1. **Pod Lifecycle**: Pending -> Running -> Ready -> Terminated
2. **Deployment Updates**: Rolling update strategy
3. **Scaling**: Manual via kubectl-ai or automatic via HPA
4. **Configuration Updates**: ConfigMap triggers rolling restart

### Performance Considerations

1. **Database Connection Pooling**: Configure in application
2. **Caching**: Use Redis if needed (not in Phase III)
3. **Load Balancing**: Kubernetes service load balancing
4. **Monitoring**: Integrated with kagent for AI insights