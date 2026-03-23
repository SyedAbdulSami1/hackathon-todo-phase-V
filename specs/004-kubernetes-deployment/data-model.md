# Data Model: Local Kubernetes Deployment

## Entities and Relationships

### 1. Container Image
**Purpose**: Represents containerized applications for deployment

- **name**: string - Container image name and tag (e.g., "todo-frontend:1.0.0")
- **build_context**: string - Docker build context path
- **dockerfile**: string - Path to Dockerfile
- **size_mb**: number - Image size in megabytes
- **security_scan**: object - Vulnerability scan results
  - critical_count: number
  - high_count: number
  - medium_count: number
  - low_count: number
- **build_time**: timestamp - When image was built
- **pushed**: boolean - Whether image is pushed to registry

### 2. Helm Chart
**Purpose**: Kubernetes deployment manifest with configurable values

- **name**: string - Chart name (e.g., "todo-frontend")
- **version**: string - Chart version (SemVer)
- **app_version**: string - Application version
- **description**: string - Chart description
- **values**: object - Configuration values
  - replicas: number - Number of pod replicas
  - resources: object - Resource limits and requests
    - limits: object
      - cpu: string - CPU limit (e.g., "500m")
      - memory: string - Memory limit (e.g., "512Mi")
    - requests: object
      - cpu: string - CPU request
      - memory: string - Memory request
  - image: object - Container image configuration
    - repository: string - Image repository
    - tag: string - Image tag
    - pull_policy: string - Pull policy
  - service: object - Service configuration
    - type: string - Service type (ClusterIP, NodePort, LoadBalancer)
    - port: number - Service port
  - env: object - Environment variables
- **templates**: array - Template file paths
- **dependencies**: array - Chart dependencies

### 3. Kubernetes Resource
**Purpose**: Represents deployed Kubernetes resources

- **kind**: string - Resource type (Deployment, Service, Ingress, etc.)
- **name**: string - Resource name
- **namespace**: string - Kubernetes namespace
- **labels**: object - Resource labels
- **annotations**: object - Resource annotations
- **status**: string - Resource status (Running, Pending, Failed, etc.)
- **created**: timestamp - Creation time
- **last_updated**: timestamp - Last update time
- **conditions**: array - Resource conditions
- **events**: array - Resource events

### 4. Persistent Volume Claim
**Purpose**: Database data persistence

- **name**: string - PVC name
- **storage_class**: string - Storage class name
- **size**: string - Storage size (e.g., "10Gi")
- **access_modes**: array - Access mode list
- **status**: string - PVC status
- **mount_path**: string - Mount path in container
- **database**: string - Associated database name

### 5. Kubernetes Secret
**Purpose**: Secure storage of sensitive information

- **name**: string - Secret name
- **type**: string - Secret type (Opaque, kubernetes.io/dockerconfigjson)
- **data**: object - Base64-encoded secret data
  - database_url: string - Neon database connection URL
  - jwt_secret: string - JWT signing secret
  - google_api_key: string - Google API key for AI
- **namespace**: string - Secret namespace

### 6. Ingress Resource
**Purpose**: External access to the application

- **name**: string - Ingress name
- **rules**: array - Ingress rules
  - host: string - Host name
  - paths: array - Path configurations
    - path: string - URL path
    - backend: object - Backend service
      - service: string - Service name
      - port: number - Service port
- **tls**: array - TLS configurations
  - hosts: array - TLS hostnames
  - secret_name: string - TLS secret name

### 7. Horizontal Pod Autoscaler
**Purpose**: Automatic scaling of pods

- **name**: string - HPA name
- **target**: object - Scaling target
  - kind: string - Target kind (Deployment, ReplicationController)
  - api_version: string - API version
  - name: string - Target name
- **min_replicas**: number - Minimum replicas
- **max_replicas**: number - Maximum replicas
- **metrics**: array - Scaling metrics
  - type: string - Metric type (Resource, Pods, Object)
  - resource: object - Resource metric
    - name: string - Metric name (cpu, memory)
    - target: object - Target value
      - type: string - Target type (Utilization, Value, AverageValue)
      - average_utilization: number - Target utilization percentage
      - average_value: string - Average value
      - value: string - Value

### 8. AI Command
**Purpose**: Track AI-powered operations

- **command**: string - Natural language command
- **tool**: string - AI tool used (kubectl-ai, kagent)
- **parameters**: object - Command parameters
- **result**: object - Command execution result
  - success: boolean - Whether command succeeded
  - output: string - Command output
  - error: string - Error message if failed
- **timestamp**: timestamp - Command execution time
- **duration_ms**: number - Command execution duration

### 9. Deployment Event
**Purpose**: Track deployment lifecycle events

- **type**: string - Event type (deploy, scale, rollback, health_check)
- **component**: string - Component name (frontend, backend, database)
- **status**: string - Event status (started, completed, failed)
- **message**: string - Event message
- **timestamp**: timestamp - Event timestamp
- **metadata**: object - Additional event data

## Validation Rules

### Container Image Validation
- Image name must follow standard naming convention
- Size must be under 500MB
- Security scan must have zero critical vulnerabilities
- Build context must exist in repository

### Helm Chart Validation
- Chart version must follow SemVer
- Values must be valid YAML
- Templates must reference existing files
- Dependencies must be specified if required

### Kubernetes Resource Validation
- Resource names must be DNS-1123 compliant
- Labels must be key-value pairs
- Resource limits must be specified for all pods
- Health checks must be implemented

### Persistent Volume Validation
- Storage size must be sufficient for data needs
- Access modes must match storage class capabilities
- Mount path must not conflict with existing paths

### Secret Validation
- Secret data must be base64 encoded
- Database URL must be valid
- JWT secret must meet minimum length requirements

## State Transitions

### Container Image States
- Building → Scanning → Ready → Deployed
- Failed states: Build Failed, Scan Failed

### Deployment States
- Pending → Initializing → Running → Ready
- Failed states: Failed, Unhealthy, Terminating

### Resource States
- Creating → Active → Updating → Deleting
- Failed states: Failed, Terminating

## Data Relationships

1. **Container Image → Helm Chart**: Images are referenced in chart values
2. **Helm Chart → Kubernetes Resource**: Charts generate resources upon installation
3. **Persistent Volume Claim → Database**: PVCs provide storage for database
4. **Kubernetes Secret → All Resources**: Secrets provide configuration to all components
5. **Ingress → Service**: Ingress routes traffic to services
6. **HPA → Deployment**: HPA scales deployments based on metrics
7. **AI Command → Kubernetes Resource**: AI commands modify resources
8. **Deployment Event → Component**: Events are associated with specific components