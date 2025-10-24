import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"

// Use environment variable for API key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY

if (!API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is not set in environment variables, chatbot will be disabled")
}

const genAI = new GoogleGenerativeAI(API_KEY || "")

const SYSTEM_PROMPT = `You are a helpful AI assistant for StartupNest, a platform connecting entrepreneurs with mentors for startup funding and incubation.

You have knowledge about:

1. StartupNest Platform Features:
   - Entrepreneurs can submit startup ideas
   - Mentors can create funding opportunities
   - Real-time status tracking
   - Smart matching between entrepreneurs and mentors

2. For Entrepreneurs:
   - How to sign up and create an account
   - How to browse mentor opportunities
   - How to submit startup ideas
   - How to track submission status
   - How to view mentor profiles

3. For Mentors:
   - How to sign up and create an account
   - How to create startup profiles with funding opportunities
   - How to review startup submissions
   - How to shortlist or reject submissions
   - How to manage their profiles

4. General FAQs:
   - What is StartupNest?
   - How does the platform work?
   - What are the benefits?
   - How to get started?
   - Security and privacy information
   - Contact and support information

Always be helpful, professional, and provide clear answers. If a question is not related to StartupNest, politely redirect the conversation back to the platform.`

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!API_KEY) {
      console.error("❌ API key missing")
      return NextResponse.json(
        { error: "Server configuration error: API key not configured" },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { message, history = [] } = body

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      )
    }

    console.log("📨 Received message:", message.substring(0, 50) + "...")

    // Initialize model with Gemini 2.5 Flash (latest stable model)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",  // ✅ Updated to latest model
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      }
    })

    // Build chat history with system prompt
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: "model",
        parts: [{ text: "Understood! I'm ready to help users with StartupNest. I'll provide helpful information about the platform for both entrepreneurs and mentors." }]
      },
      ...history
    ]

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
    })

    // Send message and get response
    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    console.log("✅ Response generated:", text.substring(0, 50) + "...")

    return NextResponse.json({ 
      reply: text,
      success: true 
    })

  } catch (error: any) {
    // Detailed error logging
    console.error("❌ Chat API Error:", {
      name: error?.name,
      message: error?.message,
      status: error?.status,
      statusText: error?.statusText,
      stack: error?.stack
    })

    // Check for specific error types
    if (error?.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your configuration." },
        { status: 401 }
      )
    }

    if (error?.message?.includes("quota")) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 429 }
      )
    }

    if (error?.message?.includes("not found") || error?.message?.includes("404")) {
      return NextResponse.json(
        { 
          error: "Model not found. Please ensure you're using a valid Gemini 2.5 model.",
          details: "Try: gemini-2.5-flash or gemini-2.0-flash"
        },
        { status: 404 }
      )
    }

    if (error?.message?.includes("safety")) {
      return NextResponse.json(
        { error: "Message blocked due to safety filters. Please rephrase your question." },
        { status: 400 }
      )
    }

    // Generic error response with details in development
    return NextResponse.json(
      { 
        error: "Failed to process message",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "StartupNest Chatbot API is running",
    apiKeyConfigured: !!API_KEY,
    model: "gemini-2.5-flash"
  })
}
