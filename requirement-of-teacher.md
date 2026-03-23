### Hackathon II Summary: What Teacher Wants in Each Phase

This hackathon is about building a Todo app step-by-step using Spec-Driven Development (SDD). You must use Claude Code and Spec-Kit Plus for all phases—no manual coding. Write specs first, refine them, then let AI generate code. Submit each phase by due date via form with GitHub link, app link, 90-sec video, and WhatsApp number. Total points: 1000 + 600 bonus.

#### General Rules for All Phases
- Use SDD: Write Constitution & Specs in Markdown for every feature. Refine specs until Claude Code generates correct code.
- No manual code writing—only AI via Claude Code.
- Follow Agentic Dev Stack: Specify → Plan → Tasks → Implement.
- Implement Basic Features: Add/Delete/Update/View Tasks, Mark Complete.
- Review process: Teachers check specs history, prompts, iterations.
- Bonus (up to 600 points): Reusable AI skills/subagents (+200), Cloud-Native Blueprints (+200), Urdu support (+100), Voice commands (+200).

#### Phase I: In-Memory Python Console App (100 points, Due: Dec 7, 2025)
- Build simple CLI Todo app storing tasks in memory (no database).
- Implement 5 basic features via console commands.
- Tech: UV, Python 3.13+, Claude Code, Spec-Kit Plus.
- Deliver: GitHub repo with Constitution, specs folder, src code, README (setup), CLAUDE.md (instructions).
- Demo: Add task (title/description), list with status, update/delete by ID, mark complete.
- For Windows: Use WSL 2 setup.

#### Phase II: Full-Stack Web Application (150 points, Due: Dec 14, 2025)
- Turn console app into web app with user accounts and persistent storage.
- Implement 5 basic features as web UI and REST API.
- Add user signup/signin with Better Auth (use JWT tokens for security).
- Tech: Frontend (Next.js 16+ App Router), Backend (FastAPI), ORM (SQLModel), DB (Neon PostgreSQL).
- API Endpoints: GET/POST/PUT/DELETE/PATCH for tasks per user.
- Monorepo Structure: .spec-kit/config.yaml, specs folder (organized by features/api/db/ui), CLAUDE.md (root + frontend + backend).
- Secure API: JWT in headers, user isolation, no shared sessions.
- Deliver: GitHub repo with frontend/backend, specs, README. Deploy frontend to Vercel.
- Demo: Responsive UI, multi-user tasks, auth works.

#### Phase III: AI-Powered Todo Chatbot (200 points, Due: Dec 21, 2025)
- Add chatbot interface for managing tasks via natural language (e.g., "Add buy groceries").
- Implement conversational UI for 5 basic features.
- Use stateless server: Store chat history in DB, no in-memory state.
- Tech: Frontend (OpenAI ChatKit), Backend (FastAPI), AI (OpenAI Agents SDK), MCP Server (Official MCP SDK for tools), DB (Neon).
- MCP Tools: add_task, list_tasks, complete_task, delete_task, update_task (all stateless, user-specific).
- Agent Behavior: Understand commands, confirm actions, handle errors.
- Architecture: Chat endpoint (/api/{user_id}/chat), fetch history from DB, run agent with tools.
- Deliver: GitHub repo with frontend/backend, specs (agent/tools), DB models (Task/Conversation/Message), README.
- Demo: Natural language tasks, resume chats after restart, helpful responses.
- Setup: Add domain to OpenAI allowlist for hosted ChatKit.

#### Phase IV: Local Kubernetes Deployment (250 points, Due: Jan 4, 2026)
- Deploy Phase III chatbot locally on Kubernetes.
- Containerize frontend/backend (use Docker, AI tool Gordon if available).
- Create Helm charts for deployment (use AI tools: kubectl-ai, kagent).
- Tech: Docker Desktop, Minikube, Helm, kubectl-ai/kagent for ops.
- AIOps: Use AI for deploy/scale/debug (e.g., kubectl-ai "deploy frontend with 2 replicas").
- Research: Use blueprints for spec-driven deployment (links provided).
- Deliver: GitHub repo with Dockerfiles, Helm charts, instructions for Minikube setup.
- Demo: Run on local cluster, access chatbot, AI-assisted ops work.

#### Phase V: Advanced Cloud Deployment (300 points, Due: Jan 18, 2026)
- Add Intermediate Features: Priorities/Tags, Search/Filter/Sort.
- Add Advanced Features: Recurring Tasks (auto-reschedule), Due Dates/Reminders (notifications).
- Implement Event-Driven: Use Kafka (or other PubSub) for reminders, recurring, audit logs, real-time sync.
- Use Dapr for distributed runtime (Pub/Sub, State, Bindings, Secrets, Invocation).
- Part A: Code advanced features.
- Part B: Deploy to local Minikube with Dapr/Kafka.
- Part C: Deploy to cloud (DigitalOcean DOKS, or Azure AKS/Google GKE/Oracle OKE) with Dapr, managed Kafka (Redpanda/Confluent), CI/CD (GitHub Actions), monitoring/logging.
- Kafka Topics: task-events, reminders, task-updates.
- Deliver: GitHub repo with all code, Dapr components, Helm charts, CI/CD setup, cloud deploy instructions.
- Demo: Advanced features work, events trigger (e.g., reminders), scalable on cloud.

#### Final Notes
- Timeline: Starts Dec 1, 2025; submit phases weekly; live presentations on Sundays (invited via WhatsApp).
- Submission Form: https://forms.gle/KMKEKaFUD6ZX4UtY8 (repo, app link, video, WhatsApp).
- Resources: Claude Code, Spec-Kit Plus, OpenAI tools, Neon DB, Vercel, DigitalOcean ($200 credit).
- FAQ: No skipping phases, individual work, partial OK but complete for full points.