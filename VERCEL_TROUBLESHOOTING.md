# Vercel Troubleshooting Log - March 19, 2026

## Current Status
- **Issue:** User reported errors on Vercel (local works fine). Signup/Registration failing.
- **Findings:** `/api/health` returned 404 (Next.js error), indicating Python backend wasn't being triggered.
- **Action Taken:** Updated `vercel.json` to explicitly define the Python runtime for the `api/` directory.

## Investigation Details
1. **Deployment Analyzed:** `dpl_6u7pgmzifSRmo1gLwQRVTEBxPCRf`
2. **Path Mapping:** 
   - Root `vercel.json` rewrites `/api/*` to `api/index.py`.
   - `api/index.py` bridges to `backend/index.py`.
3. **The Fix:** Added `functions` mapping to `vercel.json`:
   ```json
   "functions": {
     "api/index.py": { "runtime": "vercel-python@0.1.1" }
   }
   ```

## DO NOT REPEAT
- Do not check `teamId` or `projectId` (already identified).
- Do not check `api/index.py` or `backend/index.py` logic (already verified as correct).
- Do not try `curl` without `.exe` on this environment.

## NEXT STEPS
1. Deploy the updated `vercel.json`.
2. Test `/api/auth/register` via POST request.
3. Inspect `backend/models/` for schema mismatches if registration still fails.
