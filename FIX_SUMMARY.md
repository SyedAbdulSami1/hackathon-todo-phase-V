# AI Chatbot 404 Error - Fix Applied ✅

## Problem
Your AI Chatbot was showing a 404 error:
```
Error code: 404 - [{'error': {'code': 404, 'message': 'models/gemini-1.5-flash is not found for API version v1main'}}]
```

## Root Cause
The model `gemini-1.5-flash` has been **deprecated by Google** (September 2026). All Gemini 1.5 models are no longer available.

## Fix Applied
Updated the AI model from `gemini-1.5-flash` → `gemini-2.5-flash` (stable, production-ready)

### Files Changed:
1. ✅ `backend/agents/chat_agent.py` - Default model updated
2. ✅ `helm/todo-app/values.yaml` - Environment variable updated (2 locations)
3. ✅ `backend/tests/unit/test_agents.py` - Test assertion updated
4. ✅ `specs/deployment/fix-gemini-model-404.spec.md` - New spec file created

## ⚠️ MANUAL STEP REQUIRED

You need to update the **Vercel Environment Variable**:

### Steps:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `hackathon-todo-phase-iv`
3. Go to **Settings** → **Environment Variables**
4. Find `AGENT_MODEL_NAME`
5. Change value from `gemini-1.5-flash` to `gemini-2.5-flash`
6. **Redeploy** the project (or trigger a new deployment)

### Alternative:
If you don't have `AGENT_MODEL_NAME` set in Vercel, the code will now default to `gemini-2.5-flash` automatically.

## Verification
After updating Vercel:
1. Open your deployed app: https://hackathon-todo-phase-iv.vercel.app
2. Go to **AI Chat** page
3. Send a message like "hi" or "Add a task"
4. You should get a response without 404 error

## Additional Notes
- **No code changes needed** on your local project beyond what's already done
- **No database changes** required
- **No breaking changes** to existing functionality
- If `gemini-2.5-flash` has issues, you can try `gemini-3-flash` (preview) as alternative

## Files to Commit
```bash
git add backend/agents/chat_agent.py
git add helm/todo-app/values.yaml
git add backend/tests/unit/test_agents.py
git add specs/deployment/fix-gemini-model-404.spec.md
git add PROJECT_CONTEXT.md
git add HISTORY.md
git commit -m "fix: Update Gemini model from deprecated 1.5-flash to 2.5-flash"
git push
```

This will trigger a new Vercel deployment with the fix.
