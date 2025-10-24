# StartupNest - Quick Start Guide

## 🚀 Get Running in 3 Steps

### Terminal 1: Start MongoDB
\`\`\`bash
mongod
# or
brew services start mongodb-community
\`\`\`

### Terminal 2: Start Backend
\`\`\`bash
cd backend
npm install
npm start
\`\`\`
✓ Backend running on `http://localhost:8080`

### Terminal 3: Start Frontend
\`\`\`bash
npm install
npm run dev
\`\`\`
✓ Frontend running on `http://localhost:3000`

## 🌐 Access the App

- **Landing Page:** http://localhost:3000/startupnest
- **Login:** http://localhost:3000/startupnest/login
- **Signup:** http://localhost:3000/startupnest/signup

## 👥 User Roles

### Entrepreneur
- Browse mentor funding opportunities
- Submit startup ideas
- Track submission status
- Manage submissions

### Mentor
- Create startup funding profiles
- Review entrepreneur submissions
- Shortlist or reject ideas
- Manage profiles

## 📝 Test Account

1. Go to Signup page
2. Create account with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Mobile: `9876543210`
   - Password: `Test@123`
   - Role: Select "Entrepreneur" or "Mentor"
3. Login with your credentials

## 🔧 Common Commands

\`\`\`bash
# Kill port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9

# Kill port 8080 (Backend)
lsof -ti:8080 | xargs kill -9

# Stop MongoDB
brew services stop mongodb-community

# View running services
brew services list
\`\`\`

## ✅ Checklist

- [ ] MongoDB running
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000/startupnest
- [ ] Can signup and login
- [ ] Can navigate to dashboard

## 🎯 Next Steps

1. Create a Mentor account and add a startup profile
2. Create an Entrepreneur account and browse opportunities
3. Submit a startup idea as Entrepreneur
4. Review submissions as Mentor
5. Shortlist or reject ideas

---

**Need help?** Check `STARTUPNEST_SETUP_GUIDE.md` for detailed troubleshooting.
