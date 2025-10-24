# Gemini AI Chatbot Setup Guide

## Overview
The StartupNest application now includes an AI-powered chatbot using Google's Gemini API. The chatbot provides instant answers to FAQs and questions related to the StartupNest platform.

## Prerequisites
- Google Cloud Account
- Gemini API Key

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

## Step 2: Add Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
\`\`\`

**Important:** The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser. For production, consider using a backend endpoint instead.

## Step 3: Install Dependencies

\`\`\`bash
npm install @google/generative-ai
\`\`\`

## Step 4: Verify Setup

1. Start the development server: `npm run dev`
2. Look for the chat button in the bottom-right corner
3. Click it and test the chatbot

## Chatbot Features

- **24/7 Availability:** Always ready to help
- **Instant Responses:** Quick answers to common questions
- **Platform Knowledge:** Trained on StartupNest documentation
- **Smooth UI:** Beautiful chat interface with animations
- **Mobile Responsive:** Works perfectly on all devices

## Chatbot Capabilities

The chatbot can answer questions about:

### For Entrepreneurs
- How to sign up and create an account
- How to browse mentor opportunities
- How to submit startup ideas
- How to track submission status
- How to view mentor profiles

### For Mentors
- How to sign up and create an account
- How to create startup profiles
- How to review submissions
- How to shortlist or reject ideas
- How to manage profiles

### General FAQs
- What is StartupNest?
- How does the platform work?
- What are the benefits?
- Security and privacy information
- Contact and support

## Customization

To customize the chatbot's knowledge base, edit the `SYSTEM_PROMPT` in `/app/api/chat/route.ts`:

\`\`\`typescript
const SYSTEM_PROMPT = `You are a helpful AI assistant for StartupNest...`
\`\`\`

Add more information about your platform, policies, or specific features.

## Troubleshooting

### Chatbot not responding
- Check if API key is correctly set in `.env.local`
- Verify the API key is active in Google Cloud Console
- Check browser console for errors

### Slow responses
- This is normal for the first request (cold start)
- Subsequent requests should be faster
- Consider implementing caching for common questions

### API quota exceeded
- Check your Google Cloud Console for usage limits
- Upgrade your plan if needed
- Implement rate limiting on the backend

## Production Deployment

For Vercel deployment:

1. Go to your Vercel project settings
2. Add environment variable: `NEXT_PUBLIC_GEMINI_API_KEY`
3. Paste your API key
4. Redeploy

**Security Note:** Consider moving the API call to a backend route and using a server-side API key instead of exposing it in the browser.

## API Reference

### Chat Endpoint

**POST** `/api/chat`

Request:
\`\`\`json
{
  "message": "How do I submit an idea?"
}
\`\`\`

Response:
\`\`\`json
{
  "reply": "To submit an idea, first sign up as an entrepreneur..."
}
\`\`\`

## Support

For issues or questions about the Gemini API, visit:
- [Google AI Documentation](https://ai.google.dev/)
- [Gemini API Docs](https://ai.google.dev/docs)
