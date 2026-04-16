# Backend Debugging Audit - Instructions

## Changes Made

### STEP 1 - Added Logging in Detail API ✅
**File:** `backend/prompts/views.py`
- Added `import logging` and `logger = logging.getLogger(__name__)`
- Added detailed logging in `prompt_detail()` function:
  - 🔥 API hit with ID
  - ✅ Prompt fetched from DB
  - 🔑 Redis key
  - 📈 View count after increment
  - ✅ Response sent successfully
  - ❌ Error messages with details

### STEP 2 - Added Django Logging Config ✅
**File:** `backend/config/settings.py`
- Added LOGGING configuration at the bottom
- Console handler for output
- WARNING level for visibility

## How to Run the Audit

### STEP 3 - Rebuild Containers
```bash
docker-compose down
docker-compose up --build
```

### STEP 4 - Trigger the API
Open browser and navigate to:
```
http://localhost:4200/prompts/1
```

### STEP 5 - Check Backend Logs
Run this command:
```bash
docker-compose logs backend
```

## Expected Output

Look for these log lines in order:

1. **🔥 HIT DETAIL API with id=1** - API endpoint was called
2. **✅ Prompt fetched from DB** - Database query succeeded
3. **🔑 Redis key: prompt:1:views** - Redis key generated
4. **📈 View count after incr: X** - Redis increment succeeded
5. **✅ Sending response successfully** - Response sent to frontend

## Failure Points to Identify

### If you see:
- **🔥 but no ✅ Prompt fetched** → Database connection issue
- **✅ Prompt fetched but no 🔑** → Code execution stopped
- **🔑 but no 📈** → Redis connection issue
- **📈 but no ✅ Sending** → JSON serialization issue
- **❌ ERROR** → Check the error message for details

## Common Issues

### Redis Connection Error
```
❌ ERROR in detail API: Error connecting to Redis
```
**Fix:** Redis host should be `redis` not `localhost` in Docker

### Database Connection Error
```
❌ ERROR: Prompt with id=1 not found
```
**Fix:** Run migrations or create test data

### No logs at all
**Fix:** Check if backend container is running:
```bash
docker-compose ps
```

## Next Steps After Audit

Based on the logs, you'll know exactly where the failure occurs and can apply the appropriate fix.
