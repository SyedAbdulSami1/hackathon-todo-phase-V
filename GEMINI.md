# 🌐 Universal Engineering & AI Collaboration Standards

## 1. Core Mandate
- **Context First:** Always perform a deep-scan of existing architecture, dependencies, and patterns before proposing or writing code.
- **SDD Excellence:** Maintain a `specs/` directory. No logic implementation without a corresponding Markdown specification.
- **Production Grade:** Every line of code must be scalable, secure, and maintainable for long-term client handovers.

## 2. Technical Standards & Testing (Pytest focus)
- **Python:** Use UV/Poetry, Python 3.12+, and strict type hinting (`mypy` compatible).
- **Testing:** Mandatory `pytest` suite for every new module. 
  - Mock external APIs/DBs.
  - Follow AAA pattern (Arrange, Act, Assert).
  - Aim for >80% coverage.
- **Frontend:** Next.js (App Router), Tailwind CSS, ShadcnUI. Focus on accessibility (A11y) and performance (LCP).
- **API:** FastAPI with SQLModel. Strict OpenAPI/Swagger documentation.

## 3. Workflow & Tooling
- **Agentic Loop:** Specify → Plan → Test-Driven Implementation → Lint/Format → Verify.
- **Git:** Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`).
- **Automation:** Always suggest/run `pytest`, `ruff check`, and `black` before finalizing a task.
- **Legacy Support:** If working on existing code, do not break functional patterns. Suggest refactoring only if it improves performance or security.

## 4. UI/UX "Client-Ready" Quality
- Implement professional loading states, skeleton screens, and toast notifications.
- Ensure mobile-first responsiveness and dark/light mode support.

## 5. Security & Safety
- Never hardcode secrets. Use `.env` or Secret Managers.
- Implement rate limiting and input sanitization by default.
- Standard Header: `// Architecture-Consistent Implementation | Global GEMINI Standards`