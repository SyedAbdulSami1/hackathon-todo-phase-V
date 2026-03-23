# Tasks: Phase IV - Local Kubernetes Deployment

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml

**Tests**: Tests are OPTIONAL - only include if explicitly requested in feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create helm directory structure
- [ ] T002 Create backend Dockerfile at backend/Dockerfile
- [ ] T003 Create frontend Dockerfile at frontend/Dockerfile
- [ ] T004 Create helm/Chart.yaml with app metadata
- [ ] T005 Create helm/values.yaml with default config
- [ ] T006 Create helm/templates directory
- [ ] T007 Create .dockerignore for backend
- [ ] T008 Create .dockerignore for frontend
- [ ] T009 Create kubernetes namespace file
- [ ] T010 Create minikube startup script

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T011 [P] Create backend Dockerfile base image python:3.11-slim
- [ ] T012 [P] Create frontend Dockerfile base image node:18-alpine
- [ ] T013 [P] Add WORKDIR /app to backend Dockerfile
- [ ] T014 [P] Add WORKDIR /app to frontend Dockerfile
- [ ] T015 Copy backend requirements.txt in Dockerfile
- [ ] T016 Copy frontend package.json in Dockerfile
- [ ] T017 Copy frontend package-lock.json in Dockerfile
- [ ] T018 Install backend dependencies in Dockerfile
- [ ] T019 Install frontend dependencies in Dockerfile
- [ ] T020 Copy backend source code in Dockerfile
- [ ] T021 Copy frontend source code in Dockerfile
- [ ] T022 Add EXPOSE 8000 to backend Dockerfile
- [ ] T023 Add EXPOSE 3000 to frontend Dockerfile
- [ ] T024 Add CMD for backend uvicorn in Dockerfile
- [ ] T025 Add CMD for frontend npm start in Dockerfile
- [ ] T026 Create backend ConfigMap template
- [ ] T027 Create backend Secret template
- [ ] T028 Create frontend ConfigMap template
- [ ] T029 Define DATABASE_URL in Secret template
- [ ] T030 Define SECRET_KEY in Secret template
- [ ] T031 Define GOOGLE_API_KEY in Secret template
- [ ] T032 Define NEXT_PUBLIC_API_URL in ConfigMap
- [ ] T033 Define NEXT_PUBLIC_CHAT_ENABLED in ConfigMap
- [ ] T034 Create namespace.yaml for todo-app
- [ ] T035 Create serviceaccount.yaml for backend
- [ ] T036 Create serviceaccount.yaml for frontend
- [ ] T037 Define RBAC roles for backend
- [ ] T038 Define RBAC roles for frontend
- [ ] T039 Create networkpolicy.yaml for backend
- [ ] T040 Create networkpolicy.yaml for frontend

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Backend Containerization (Priority: P1) 🎯 MVP

**Goal**: Containerize FastAPI backend with all dependencies and health checks

**Independent Test**: Backend pod starts, health check passes, database connects

### Implementation for User Story 1

- [ ] T041 [P] [US1] Add COPY . . to backend Dockerfile
- [ ] T042 [P] [US1] Add non-root user to backend Dockerfile
- [ ] T043 [P] [US1] Set USER to non-root in backend Dockerfile
- [ ] T044 [US1] Create backend-deployment.yaml in helm/templates
- [ ] T045 [US1] Define replicas: 2 in backend deployment
- [ ] T046 [US1] Add selector matchLabels in backend deployment
- [ ] T047 [US1] Add container name backend in deployment
- [ ] T048 [US1] Add image reference in backend deployment
- [ ] T049 [US1] Add imagePullPolicy in backend deployment
- [ ] T050 [US1] Add containerPort 8000 in deployment
- [ ] T051 [US1] Define resources limits cpu 250m
- [ ] T052 [US1] Define resources limits memory 512Mi
- [ ] T053 [US1] Define resources requests cpu 100m
- [ ] T054 [US1] Define resources requests memory 256Mi
- [ ] T055 [US1] Add livenessProbe httpGet /api/health
- [ ] T056 [US1] Add livenessProbe initialDelaySeconds 30
- [ ] T057 [US1] Add livenessProbe periodSeconds 10
- [ ] T058 [US1] Add readinessProbe httpGet /api/health
- [ ] T059 [US1] Add readinessProbe initialDelaySeconds 5
- [ ] T060 [US1] Add readinessProbe periodSeconds 5
- [ ] T061 [US1] Add envFrom configMapRef in deployment
- [ ] T062 [US1] Add envFrom secretRef in deployment
- [ ] T063 [US1] Create backend-service.yaml in helm/templates
- [ ] T064 [US1] Define service type ClusterIP
- [ ] T065 [US1] Define service port 8000
- [ ] T066 [US1] Define service targetPort 8000
- [ ] T067 [US1] Add selector matchLabels for backend
- [ ] T068 [US1] Create backend-hpa.yaml for autoscaling
- [ ] T069 [US1] Define minReplicas: 2 in HPA
- [ ] T070 [US1] Define maxReplicas: 10 in HPA
- [ ] T071 [US1] Define targetCPUUtilization: 80
- [ ] T072 [US1] Add scaleTargetRef to deployment
- [ ] T073 [US1] Create backend-pdb.yaml for pod disruption
- [ ] T074 [US1] Define minAvailable: 1 in PDB
- [ ] T075 [US1] Add logging configuration to deployment
- [ ] T076 [US1] Add LOG_LEVEL env var to deployment

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Frontend Containerization (Priority: P2)

**Goal**: Containerize Next.js frontend with optimized build

**Independent Test**: Frontend pod starts, serves static files, connects to backend

### Implementation for User Story 2

- [ ] T077 [P] [US2] Add multi-stage build stage builder in frontend Dockerfile
- [ ] T078 [P] [US2] Add multi-stage build stage production in frontend Dockerfile
- [ ] T079 [P] [US2] Copy package.json to builder stage
- [ ] T080 [P] [US2] Copy package-lock.json to builder stage
- [ ] T081 [P] [US2] Run npm ci in builder stage
- [ ] T082 [P] [US2] Copy source to builder stage
- [ ] T083 [P] [US2] Run npm run build in builder stage
- [ ] T084 [US2] Copy .next from builder to production
- [ ] T085 [US2] Copy public folder to production
- [ ] T086 [US2] Copy package.json to production
- [ ] T087 [US2] Install production dependencies only
- [ ] T088 [US2] Add NODE_ENV production to Dockerfile
- [ ] T089 [US2] Add non-root user to frontend Dockerfile
- [ ] T090 [US2] Set USER to non-root in frontend Dockerfile
- [ ] T091 [US2] Create frontend-deployment.yaml in helm/templates
- [ ] T092 [US2] Define replicas: 2 in frontend deployment
- [ ] T093 [US2] Add selector matchLabels in frontend deployment
- [ ] T094 [US2] Add container name frontend in deployment
- [ ] T095 [US2] Add image reference in frontend deployment
- [ ] T096 [US2] Add imagePullPolicy in frontend deployment
- [ ] T097 [US2] Add containerPort 3000 in deployment
- [ ] T098 [US2] Define resources limits cpu 100m
- [ ] T099 [US2] Define resources limits memory 256Mi
- [ ] T100 [US2] Define resources requests cpu 50m
- [ ] T101 [US2] Define resources requests memory 128Mi
- [ ] T102 [US2] Add livenessProbe httpGet /health
- [ ] T103 [US2] Add livenessProbe initialDelaySeconds 30
- [ ] T104 [US2] Add readinessProbe httpGet /health
- [ ] T105 [US2] Add readinessProbe initialDelaySeconds 5
- [ ] T106 [US2] Add envFrom configMapRef in frontend deployment
- [ ] T107 [US2] Create frontend-service.yaml in helm/templates
- [ ] T108 [US2] Define service type ClusterIP
- [ ] T109 [US2] Define service port 3000
- [ ] T110 [US2] Define service targetPort 3000
- [ ] T111 [US2] Add selector matchLabels for frontend
- [ ] T112 [US2] Create frontend-hpa.yaml for autoscaling
- [ ] T113 [US2] Define minReplicas: 2 in frontend HPA
- [ ] T114 [US2] Define maxReplicas: 5 in frontend HPA
- [ ] T115 [US2] Define targetCPUUtilization: 70
- [ ] T116 [US2] Create frontend-pdb.yaml for pod disruption
- [ ] T117 [US2] Define minAvailable: 1 in frontend PDB

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Ingress and External Access (Priority: P3)

**Goal**: Configure ingress for external access to frontend and backend

**Independent Test**: Access application via browser through ingress

### Implementation for User Story 3

- [ ] T118 [P] [US3] Create ingress.yaml in helm/templates
- [ ] T119 [P] [US3] Define ingressClassName nginx
- [ ] T120 [P] [US3] Add annotations for nginx ingress
- [ ] T121 [US3] Define host localhost for ingress
- [ ] T122 [US3] Create path /api rule
- [ ] T123 [US3] Create path /* rule
- [ ] T124 [US3] Add backend service for /api path
- [ ] T125 [US3] Add backend service for /* path
- [ ] T126 [US3] Add service port for /api
- [ ] T127 [US3] Add service port for /*
- [ ] T128 [US3] Create tls section for ingress
- [ ] T129 [US3] Add hosts for tls
- [ ] T130 [US3] Add secretName for tls
- [ ] T131 [US3] Create ingress-backend.yaml for api only
- [ ] T132 [US3] Create ingress-frontend.yaml for web only
- [ ] T133 [US3] Add rewrite-target annotation for backend
- [ ] T134 [US3] Add cors annotation for ingress
- [ ] T135 [US3] Add rate-limit annotation for ingress
- [ ] T136 [US3] Create minikube-tunnel.sh script
- [ ] T137 [US3] Add ingress enable command to script
- [ ] T138 [US3] Add tunnel start command to script

**Checkpoint**: At this point, User Stories 1, 2, and 3 should all work independently

---

## Phase 6: User Story 4 - AI Operations Integration (Priority: P4)

**Goal**: Enable kubectl-ai and kagent for AI-assisted operations

**Independent Test**: Execute natural language commands for scaling and debugging

### Implementation for User Story 4

- [ ] T139 [P] [US4] Create ai-ops.sh script for kubectl-ai commands
- [ ] T140 [P] [US4] Add scale frontend command to ai-ops.sh
- [ ] T141 [P] [US4] Add scale backend command to ai-ops.sh
- [ ] T142 [P] [US4] Add increase memory command to ai-ops.sh
- [ ] T143 [P] [US4] Add show pods command to ai-ops.sh
- [ ] T144 [US4] Create kagent-config.yaml for monitoring
- [ ] T145 [US4] Define monitoring interval in config
- [ ] T146 [US4] Define alert thresholds in config
- [ ] T147 [US4] Add log analysis rules to config
- [ ] T148 [US4] Add performance metrics to config
- [ ] T149 [US4] Create ai-debug.sh script for debugging
- [ ] T150 [US4] Add pod describe command to ai-debug.sh
- [ ] T151 [US4] Add log analysis command to ai-debug.sh
- [ ] T152 [US4] Add events command to ai-debug.sh
- [ ] T153 [US4] Create ai-optimize.sh script for optimization
- [ ] T154 [US4] Add resource suggestion command
- [ ] T155 [US4] Add scaling suggestion command
- [ ] T156 [US4] Create ai-deploy.sh script for deployment
- [ ] T157 [US4] Add deploy frontend command
- [ ] T158 [US4] Add deploy backend command
- [ ] T159 [US4] Add rollback command to ai-deploy.sh
- [ ] T160 [US4] Create ai-examples.md documentation
- [ ] T161 [US4] Add scale examples to documentation
- [ ] T162 [US4] Add debug examples to documentation
- [ ] T163 [US4] Add deploy examples to documentation

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T164 [P] Create README.md for kubernetes deployment
- [ ] T165 [P] Create DEPLOYMENT.md guide
- [ ] T166 [P] Create TROUBLESHOOTING.md guide
- [ ] T167 Create helm values-production.yaml
- [ ] T168 Create helm values-development.yaml
- [ ] T169 Add helm lint configuration
- [ ] T170 Add helm chart version
- [ ] T171 Add app version to Chart.yaml
- [ ] T172 Create .helmignore file
- [ ] T173 Create deploy.sh script for full deployment
- [ ] T174 Create undeploy.sh script for cleanup
- [ ] T175 Create build-images.sh script
- [ ] T176 Create load-images.sh for minikube
- [ ] T177 Create wait-for-ready.sh script
- [ ] T178 Create health-check.sh script
- [ ] T179 Add port-forward command to scripts
- [ ] T180 Add service url command to scripts
- [ ] T181 Create logs-backend.sh script
- [ ] T182 Create logs-frontend.sh script
- [ ] T183 Create exec-backend.sh for pod exec
- [ ] T184 Create exec-frontend.sh for pod exec
- [ ] T185 Update PROJECT_CONTEXT.md with phase IV status
- [ ] T186 Update HISTORY.md with deployment changes
- [ ] T187 Create architecture-diagram.md
- [ ] T188 Create network-flow.md documentation
- [ ] T189 Create security-considerations.md
- [ ] T190 Create performance-tuning.md
- [ ] T191 Add resource quotas to helm chart
- [ ] T192 Add limitrange to helm chart
- [ ] T193 Create monitoring-setup.md
- [ ] T194 Add prometheus integration notes
- [ ] T195 Add grafana dashboard notes
- [ ] T196 Create ci-cd-pipeline.md
- [ ] T197 Add github actions workflow example
- [ ] T198 Add gitlab ci example
- [ ] T199 Create backup-restore.md guide
- [ ] T200 Create disaster-recovery.md guide

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Backend containerization - Can start after Foundational
- **User Story 2 (P2)**: Frontend containerization - Can start after Foundational
- **User Story 3 (P3)**: Ingress and external access - Can start after US1 + US2
- **User Story 4 (P4)**: AI operations - Can start after Foundational

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Once Foundational phase completes, all user stories can start in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (Backend)

```bash
# Launch all deployment tasks for User Story 1 together:
Task: "Add container name backend in deployment"
Task: "Add image reference in backend deployment"
Task: "Add containerPort 8000 in deployment"

# Launch all health check tasks together:
Task: "Add livenessProbe httpGet /api/health"
Task: "Add readinessProbe httpGet /api/health"
```

---

## Parallel Example: User Story 2 (Frontend)

```bash
# Launch all Dockerfile tasks together:
Task: "Add multi-stage build stage builder"
Task: "Add multi-stage build stage production"
Task: "Copy package.json to builder stage"

# Launch all deployment tasks together:
Task: "Define replicas: 2 in frontend deployment"
Task: "Add selector matchLabels in frontend deployment"
```

---

## Parallel Example: User Story 3 (Ingress)

```bash
# Launch all ingress tasks together:
Task: "Define ingressClassName nginx"
Task: "Add annotations for nginx ingress"
Task: "Define host localhost for ingress"
```

---

## Parallel Example: User Story 4 (AI Ops)

```bash
# Launch all AI script tasks together:
Task: "Add scale frontend command to ai-ops.sh"
Task: "Add scale backend command to ai-ops.sh"
Task: "Add increase memory command to ai-ops.sh"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Backend containerization)
4. **STOP and VALIDATE**: Deploy backend, verify health check
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Backend deployed → Test independently
3. Add User Story 2 → Frontend deployed → Test independently
4. Add User Story 3 → Ingress configured → Access via browser
5. Add User Story 4 → AI ops enabled → Natural language commands
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Backend)
   - Developer B: User Story 2 (Frontend)
   - Developer C: User Story 3 (Ingress)
   - Developer D: User Story 4 (AI Ops)
3. Stories complete and integrate independently

---

## Task Summary

- **Total Tasks**: 200
- **Phase 1 (Setup)**: 10 tasks
- **Phase 2 (Foundational)**: 30 tasks
- **Phase 3 (US1 - Backend)**: 36 tasks
- **Phase 4 (US2 - Frontend)**: 41 tasks
- **Phase 5 (US3 - Ingress)**: 21 tasks
- **Phase 6 (US4 - AI Ops)**: 25 tasks
- **Phase 7 (Polish)**: 37 tasks

### Task Count per User Story

- **US1 (Backend)**: 36 tasks (T041-T076)
- **US2 (Frontend)**: 41 tasks (T077-T117)
- **US3 (Ingress)**: 21 tasks (T118-T138)
- **US4 (AI Ops)**: 25 tasks (T139-T163)

### Parallel Opportunities Identified

- Phase 1: 10 tasks can run in parallel
- Phase 2: 40 tasks can run in parallel
- Phase 3: Multiple parallel groups (Dockerfile, deployment, service, HPA)
- Phase 4: Multiple parallel groups (Dockerfile, deployment, service, HPA)
- Phase 5: All ingress tasks can run in parallel
- Phase 6: All AI script tasks can run in parallel
- Phase 7: All documentation tasks can run in parallel

### Independent Test Criteria

- **US1**: Backend pod starts, health check passes at /api/health
- **US2**: Frontend pod starts, serves static files, connects to backend
- **US3**: Application accessible via browser through ingress
- **US4**: kubectl-ai commands execute successfully for scale/debug

### Suggested MVP Scope

**MVP = Phase 1 + Phase 2 + Phase 3 (User Story 1)**

Deploy backend only with:
- Containerized FastAPI application
- Health checks configured
- Database connection working
- Service exposed via ClusterIP

This validates the core deployment pipeline before adding frontend complexity.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies
