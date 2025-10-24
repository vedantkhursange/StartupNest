# ChatBot Debugging Guide

## Common Issues and Solutions

### Issue 1: "Failed to process message" Error

**Possible Causes:**
1. GEMINI_API_KEY not set in environment variables
2. Invalid API key
3. Network connectivity issues
4. API rate limiting

**How to Debug:**

#### Step 1: Check Environment Variables
\`\`\`bash
# In your project root, check .env.local file
cat .env.local

# Should contain:
GEMINI_API_KEY=your_actual_api_key_here
\`\`\`

#### Step 2: Check Browser Console
1. Open your browser (Chrome/Firefox/Safari)
2. Press `F12` or `Cmd+Option+I` (Mac)
3. Go to **Console** tab
4. Look for `[v0]` prefixed logs
5. Check for error messages

**Expected logs when working:**
\`\`\`
[v0] Sending message to API: Your message here
[v0] API response status: 200
[v0] API response data: {reply: "..."}
\`\`\`

**Error logs to look for:**
\`\`\`
[v0] API response status: 500
[v0] API error: {error: "API key not configured..."}
\`\`\`

#### Step 3: Check Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Send a message in the chatbot
4. Look for the `/api/chat` request
5. Click on it and check:
   - **Status:** Should be 200 (not 500)
   - **Response:** Should contain `{reply: "..."}`
   - **Headers:** Should show `Content-Type: application/json`

#### Step 4: Check Server Logs
If running locally:
\`\`\`bash
# Terminal where you ran `npm run dev`
# Look for [v0] prefixed logs
# Should see:
# [v0] Chat API called
# [v0] Message received: Your message
# [v0] Initializing Gemini model
# [v0] Sending message to Gemini
# [v0] Response received from Gemini: ...
\`\`\`

### Issue 2: API Key Not Found

**Solution:**

1. **Get your Gemini API Key:**
   - Go to https://makersuite.google.com/app/apikey
   - Click "Create API Key"
   - Copy the key

2. **Add to Environment Variables:**

   **For Local Development:**
   \`\`\`bash
   # Create or edit .env.local in project root
   GEMINI_API_KEY=your_api_key_here
   \`\`\`

   **For Vercel Deployment:**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     - Name: `GEMINI_API_KEY`
     - Value: `your_api_key_here`
   - Redeploy

3. **Restart Development Server:**
   \`\`\`bash
   # Stop the server (Ctrl+C)
   npm run dev
   \`\`\`

### Issue 3: Network Error / Timeout

**Possible Causes:**
- Backend not running
- Firewall blocking requests
- API rate limiting

**Solutions:**
1. Check if backend is running on port 8080
2. Check internet connection
3. Wait a few seconds and try again
4. Check Gemini API quota at https://makersuite.google.com/app/apikey

### Issue 4: Blank Response from Bot

**Possible Causes:**
- API returned empty response
- Message format issue

**Debug Steps:**
1. Check browser console for `[v0]` logs
2. Check Network tab response
3. Try a simpler message (e.g., "Hello")
4. Check if API key has quota remaining

## Quick Checklist

- [ ] GEMINI_API_KEY is set in .env.local
- [ ] Development server is running (`npm run dev`)
- [ ] Browser console shows `[v0]` logs
- [ ] Network tab shows 200 status for /api/chat
- [ ] API key is valid (not expired)
- [ ] Internet connection is working
- [ ] No browser extensions blocking requests

## Getting Help

If issues persist:

1. **Check the logs:**
   - Browser Console (F12)
   - Terminal where `npm run dev` is running

2. **Verify API Key:**
   - Go to https://makersuite.google.com/app/apikey
   - Ensure key is active and has quota

3. **Test API Directly:**
   \`\`\`bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"Hello"}'
   \`\`\`

4. **Check Vercel Logs:**
   - If deployed, go to Vercel Dashboard
   - Select project → Deployments → View Logs
   - Look for error messages

## Environment Variables Reference

### Local Development (.env.local)
\`\`\`
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:8080
\`\`\`

### Vercel Production
\`\`\`
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=https://your-backend-url.com
\`\`\`

**Note:** Never commit .env.local to git. Add it to .gitignore.
\`\`\`bash
echo ".env.local" >> .gitignore
