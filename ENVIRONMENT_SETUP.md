# Environment Setup Instructions

## Prerequisites Installation

### 1. Install Node.js

**On Mac:**
\`\`\`bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
\`\`\`

**Or download from:** https://nodejs.org/

### 2. Install MongoDB

**On Mac:**
\`\`\`bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
brew services list
\`\`\`

**Or download from:** https://www.mongodb.com/try/download/community

### 3. Verify Installations

\`\`\`bash
# Check Node.js version (should be v14 or higher)
node --version

# Check npm version
npm --version

# Check MongoDB is running
mongosh
# Type: exit
\`\`\`

## Project Setup

### 1. Clone or Download Project

\`\`\`bash
# If using git
git clone <repository-url>
cd cliste-website

# Or extract downloaded ZIP file
unzip cliste-website.zip
cd cliste-website
\`\`\`

### 2. Install Frontend Dependencies

\`\`\`bash
# In project root directory
npm install
\`\`\`

### 3. Install Backend Dependencies

\`\`\`bash
# Navigate to backend folder
cd backend
npm install

# Return to project root
cd ..
\`\`\`

## Running the Application

### Terminal 1: Start MongoDB

\`\`\`bash
# Start MongoDB service
mongod

# Or if using Homebrew service
brew services start mongodb-community
\`\`\`

**Expected output:**
\`\`\`
[initandlisten] waiting for connections on port 27017
\`\`\`

### Terminal 2: Start Backend Server

\`\`\`bash
# Navigate to backend
cd backend

# Start the server
npm start
\`\`\`

**Expected output:**
\`\`\`
Server running on port 8080
Connected to MongoDB
\`\`\`

### Terminal 3: Start Frontend Development Server

\`\`\`bash
# In project root directory
npm run dev
\`\`\`

**Expected output:**
\`\`\`
▲ Next.js 14.2.25
- Local:        http://localhost:3000
✓ Ready in 2.5s
\`\`\`

## Verify Everything is Running

1. **Check MongoDB:**
   \`\`\`bash
   mongosh
   # Should connect successfully
   # Type: exit
   \`\`\`

2. **Check Backend:**
   \`\`\`bash
   curl http://localhost:8080/api/user/login
   # Should return an error (expected, no data sent)
   \`\`\`

3. **Check Frontend:**
   - Open browser: http://localhost:3000/startupnest
   - Should see StartupNest landing page

## Environment Variables

### Frontend (.env.local - if needed)

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

### Backend (.env - if needed)

\`\`\`
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/startupnest
JWT_SECRET=asdfghjkl
NODE_ENV=development
\`\`\`

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 8080 | http://localhost:8080 |
| MongoDB | 27017 | mongodb://127.0.0.1:27017 |

## Stopping Services

### Stop Frontend
\`\`\`bash
# Press Ctrl+C in the frontend terminal
\`\`\`

### Stop Backend
\`\`\`bash
# Press Ctrl+C in the backend terminal
\`\`\`

### Stop MongoDB
\`\`\`bash
# On Mac with Homebrew
brew services stop mongodb-community

# Or press Ctrl+C if running mongod directly
\`\`\`

## Troubleshooting Setup

### Node.js Issues

**Problem:** `node: command not found`
\`\`\`bash
# Solution: Install Node.js
brew install node
\`\`\`

**Problem:** Wrong Node version
\`\`\`bash
# Check version
node --version

# Install correct version using nvm
brew install nvm
nvm install 14
nvm use 14
\`\`\`

### MongoDB Issues

**Problem:** `mongod: command not found`
\`\`\`bash
# Solution: Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
\`\`\`

**Problem:** MongoDB won't start
\`\`\`bash
# Check if already running
brew services list

# Restart MongoDB
brew services restart mongodb-community
\`\`\`

**Problem:** Port 27017 already in use
\`\`\`bash
# Find process using port
lsof -i :27017

# Kill the process
kill -9 <PID>
\`\`\`

### npm Issues

**Problem:** `npm: command not found`
\`\`\`bash
# Solution: Install Node.js (includes npm)
brew install node
\`\`\`

**Problem:** Module not found errors
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
\`\`\`

### Port Already in Use

**Port 3000 (Frontend):**
\`\`\`bash
lsof -ti:3000 | xargs kill -9
\`\`\`

**Port 8080 (Backend):**
\`\`\`bash
lsof -ti:8080 | xargs kill -9
\`\`\`

**Port 27017 (MongoDB):**
\`\`\`bash
lsof -ti:27017 | xargs kill -9
\`\`\`

## System Requirements

- **OS:** macOS 10.12 or later
- **Node.js:** v14.0.0 or higher
- **npm:** v6.0.0 or higher
- **MongoDB:** v4.4 or higher
- **RAM:** 2GB minimum
- **Disk Space:** 500MB minimum

## Useful Commands

\`\`\`bash
# Check all services status
brew services list

# View Node.js version
node --version

# View npm version
npm --version

# View MongoDB version
mongod --version

# Clear npm cache
npm cache clean --force

# Update npm
npm install -g npm@latest

# List running processes on port
lsof -i :<port>

# Kill process by PID
kill -9 <PID>
\`\`\`

## Next Steps

1. Verify all services are running
2. Open http://localhost:3000/startupnest
3. Create test accounts
4. Test the application flows
5. Check API endpoints with Postman or curl

## Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure all services are running
4. Check port availability
5. Review error messages carefully

---

**Setup Complete!** You're ready to use StartupNest. 🚀
