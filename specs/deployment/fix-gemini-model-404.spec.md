# Spec: Fix AI Chatbot 404 Error - Update Deprecated Gemini Model

**Created**: 2026-03-22  
**Status**: Draft  
**Priority**: P1 (Critical - Chatbot not working)  
**Issue**: `models/gemini-1.5-flash is not found` - 404 Error on Vercel deployment

## Problem Analysis

### Current State
- **Model Name**: `gemini-1.5-flash` (deprecated)
- **Error**: `Error code: 404 - [{'error': {'code': 404, 'message': 'models/gemini-1.5-flash is not found for API version v1main'}}]`
- **Impact**: AI Chatbot completely non-functional on Vercel deployment
- **Root Cause**: Google deprecated all Gemini 1.5 models (September 2026)

### Deprecated Models (DO NOT USE)
- ❌ `gemini-1.5-pro`
- ❌ `gemini-1.5-flash`
- ❌ `gemini-1.5-flash-8b`
- ❌ `gemini-2.0-flash` (deprecated)
- ❌ `gemini-2.0-flash-lite` (deprecated)
- ❌ `gemini-3-pro-preview` (shut down March 9, 2026)

## Solution

### Recommended Model Migration
| Current Model | Replacement | Status |
|---------------|-------------|--------|
| `gemini-1.5-flash` | `gemini-2.5-flash` | ✅ Stable (Recommended) |
| `gemini-1.5-flash` | `gemini-3-flash` | ✅ Preview (Latest) |

### Files to Update
1. **`backend/agents/chat_agent.py`** - Update default model name
2. **Vercel Environment Variables** - Update `AGENT_MODEL_NAME` (manual step)
3. **Documentation** - Update model references

### Implementation Plan

#### Step 1: Update Default Model in Code
**File**: `backend/agents/chat_agent.py`

Change:
```python
self.model_name = os.getenv("AGENT_MODEL_NAME", "gemini-1.5-flash")
```

To:
```python
self.model_name = os.getenv("AGENT_MODEL_NAME", "gemini-2.5-flash")
```

#### Step 2: Update Vercel Environment Variables (Manual)
User must update in Vercel Dashboard:
- **Variable**: `AGENT_MODEL_NAME`
- **New Value**: `gemini-2.5-flash`

#### Step 3: Verify API Base URL
Ensure `AGENT_BASE_URL` is correct for Gemini 2.5:
- **Current**: `https://generativelanguage.googleapis.com/v1beta/openai/`
- **Status**: ✅ Should work (v1beta supports 2.5 models)

## Acceptance Criteria

- [ ] Chat endpoint responds without 404 error
- [ ] AI Chatbot successfully processes messages
- [ ] Tool calling functionality works
- [ ] Conversation history is maintained
- [ ] No breaking changes to existing API

## Testing

### Test Cases
1. **TC-001**: Send "hi" to chatbot → Should receive friendly response
2. **TC-002**: Send "Add a task" → Should create task via MCP tool
3. **TC-003**: Check conversation history → Should persist correctly

### Verification Commands
```bash
# Test chat endpoint
curl -X POST https://hackathon-todo-phase-iv.vercel.app/api/{user_id}/chat \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"message": "hi", "conversation_id": null}'
```

## Rollback Plan
If `gemini-2.5-flash` has issues:
1. Try `gemini-3-flash` (preview)
2. Check Google API quota/limits
3. Verify API key permissions

## Notes
- **Gemini 2.5 Flash** is the stable, production-ready replacement
- **Gemini 3 Flash** offers latest features but is in preview
- Both models maintain OpenAI SDK compatibility
- No code changes needed beyond model name update
