const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' })
})

// Middleware
app.use(express.json({ limit: '50mb' })) // Increased limit to handle large PDFs
app.use(express.urlencoded({ limit: '50mb', extended: true }))
// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-frontend-domain.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight requests for 10 minutes
}))

// MongoDB Connection
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/startupnest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      retryWrites: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully")
      // Start server only after DB connection
      const PORT = process.env.PORT || 8080
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err)
      console.log("Retrying connection in 5 seconds...")
      setTimeout(connectWithRetry, 5000)
    })
}

// Initial connection attempt
connectWithRetry()

// Routes
const userRoutes = require("./routes/userRoutes")
const startupProfileRoutes = require("./routes/startupProfileRoutes")
const startupSubmissionRoutes = require("./routes/startupSubmissionRoutes")

app.use("/api/user", userRoutes)
app.use("/api/startupProfile", startupProfileRoutes)
app.use("/api/startupSubmission", startupSubmissionRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Internal server error", error: err.message })
})

module.exports = app
