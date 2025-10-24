// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// require("dotenv").config()

// const app = express()

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok', message: 'Server is running' })
// })

// // Middleware
// app.use(express.json({ limit: '50mb' })) // Increased limit to handle large PDFs
// app.use(express.urlencoded({ limit: '50mb', extended: true }))
// // CORS configuration
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? process.env.ALLOWED_ORIGINS?.split(',') || [
//       'https://startupnest.vercel.app',
//       'https://startupnest-git-main.vercel.app',
//       'https://startupnest-qduexuiqg-vedantkhursanges-projects.vercel.app'
//     ] 
//     : ['http://localhost:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
//   maxAge: 600 // Cache preflight requests for 10 minutes
// }))

// // MongoDB Connection
// const connectWithRetry = () => {
//   // Start server immediately
//   const PORT = process.env.PORT || 8080
//   const server = app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })

//   // Then try to connect to MongoDB
//   // Log the connection attempt
//   console.log("Attempting to connect to MongoDB...")
//   if (process.env.MONGODB_URI) {
//     console.log("Using MongoDB URI from environment variable")
//   } else {
//     console.log("Warning: Using fallback local MongoDB URI")
//   }

//   mongoose
//     .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/startupnest", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
//       retryWrites: true,
//     })
//     .then(() => {
//       console.log("MongoDB connected successfully")
//       // Log successful connection details
//       const connection = mongoose.connection;
//       console.log(`Connected to database: ${connection.name}`);
//       console.log(`Host: ${connection.host}`);
//       console.log(`Port: ${connection.port}`);
//     })
//     .catch((err) => {
//       console.error("MongoDB connection error:", err)
//       // Log more detailed error information
//       if (err.name === 'MongoServerError') {
//         console.error("MongoDB Server Error Code:", err.code)
//         console.error("MongoDB Server Error CodeName:", err.codeName)
//       }
//       console.log("Retrying connection in 5 seconds...")
//       setTimeout(connectWithRetry, 5000)
//     })
// }

// // Initial connection attempt
// connectWithRetry()

// // Routes
// const userRoutes = require("./routes/userRoutes")
// const startupProfileRoutes = require("./routes/startupProfileRoutes")
// const startupSubmissionRoutes = require("./routes/startupSubmissionRoutes")

// app.use("/api/user", userRoutes)
// app.use("/api/startupProfile", startupProfileRoutes)
// app.use("/api/startupSubmission", startupSubmissionRoutes)

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).json({ message: "Internal server error", error: err.message })
// })

// module.exports = app
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
app.use(express.json({ limit: '50mb' })) // handle large payloads
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// ✅ Define allowed origins dynamically
const allowedOrigins = [
  'http://localhost:3000',
  'https://startupnest.vercel.app',
  'https://startupnest-app.vercel.app',
  'https://startupnest-git-main.vercel.app',
  'https://startupnest-he6o4hept-vedantkhursanges-projects.vercel.app',
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
]

// ✅ Apply CORS middleware with dynamic origin validation
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`)
      return callback(new Error(`Not allowed by CORS: ${origin}`))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600, // cache preflight 10 minutes
}))

// ✅ Handle preflight requests explicitly
app.options('*', cors())

// MongoDB Connection
const connectWithRetry = () => {
  const PORT = process.env.PORT || 8080
  const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
  })

  console.log("Attempting to connect to MongoDB...")
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/startupnest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully")
      const connection = mongoose.connection
      console.log(`Connected to database: ${connection.name}`)
      console.log(`Host: ${connection.host}`)
      console.log(`Port: ${connection.port}`)
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err)
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
  console.error("Error:", err.message)
  if (err.message.includes("CORS")) {
    return res.status(403).json({ message: "CORS Error", error: err.message })
  }
  res.status(500).json({ message: "Internal server error", error: err.message })
})

module.exports = app
