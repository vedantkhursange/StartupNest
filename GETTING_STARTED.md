# Getting Started with StartupNest

Welcome to StartupNest! This guide will help you get up and running quickly.

## What is StartupNest?

StartupNest is a platform that connects entrepreneurs with mentors for startup funding and incubation. It's a full-stack web application built with modern technologies.

## 5-Minute Quick Start

### Step 1: Prerequisites
Make sure you have:
- Node.js v14+ installed
- MongoDB installed and running
- A code editor (VS Code recommended)

### Step 2: Start Services (3 Terminals)

**Terminal 1 - MongoDB:**
\`\`\`bash
mongod
\`\`\`

**Terminal 2 - Backend:**
\`\`\`bash
cd backend
npm install
npm start
\`\`\`

**Terminal 3 - Frontend:**
\`\`\`bash
npm install
npm run dev
\`\`\`

### Step 3: Access the App
Open your browser: **http://localhost:3000/startupnest**

## First Time Setup

### 1. Create Your First Account

**As an Entrepreneur:**
1. Click "Sign Up"
2. Fill in the form:
   - Username: `entrepreneur1`
   - Email: `entrepreneur@example.com`
   - Mobile: `9876543210`
   - Password: `Entrepreneur@123`
   - Role: Select "Entrepreneur"
3. Click "Create Account"
4. Login with your credentials

**As a Mentor:**
1. Click "Sign Up"
2. Fill in the form:
   - Username: `mentor1`
   - Email: `mentor@example.com`
   - Mobile: `9876543211`
   - Password: `Mentor@123`
   - Role: Select "Mentor"
3. Click "Create Account"
4. Login with your credentials

### 2. Test the Application

**As Mentor:**
1. Login to mentor account
2. Click "Startup Profiles" → "Add Profile"
3. Fill in the form:
   - Category: `FinTech`
   - Description: `Looking for innovative fintech startups`
   - Funding Limit: `500000`
   - Equity Expectation: `20`
   - Target Industry: `Finance`
   - Preferred Stage: `MVP`
4. Click "Add Profile"

**As Entrepreneur:**
1. Login to entrepreneur account
2. Click "Mentor Opportunities"
3. You should see the profile you just created
4. Click "Submit Idea"
5. Fill in the form:
   - Market Potential: `8`
   - Launch Year: `2025`
   - Expected Funding: `250000`
   - Address: `San Francisco, CA`
   - Pitch Deck: Upload a file
6. Click "Submit"

**Back as Mentor:**
1. Click "Startup Submissions"
2. You should see the submission from the entrepreneur
3. Click "View" to see details
4. Click "Shortlist" or "Reject" to update status

## Understanding the Flows

### Entrepreneur Flow
\`\`\`
Sign Up → Login → Browse Opportunities → Submit Idea → Track Status
\`\`\`

### Mentor Flow
\`\`\`
Sign Up → Login → Create Profile → Review Submissions → Shortlist/Reject
\`\`\`

## Key Features to Explore

### For Entrepreneurs
- ✓ Browse all available mentor opportunities
- ✓ Submit startup ideas with detailed information
- ✓ Track submission status in real-time
- ✓ View mentor profiles and funding criteria
- ✓ Manage your submissions

### For Mentors
- ✓ Create startup funding profiles
- ✓ Define your funding criteria
- ✓ Review entrepreneur submissions
- ✓ Shortlist promising ideas
- ✓ Manage your profiles

## Common Tasks

### How to Add a Startup Profile (Mentor)
1. Login as Mentor
2. Click "Startup Profiles" → "Add Profile"
3. Fill in all required fields
4. Click "Add Profile"
5. Success! You'll be redirected to view all profiles

### How to Submit an Idea (Entrepreneur)
1. Login as Entrepreneur
2. Click "Mentor Opportunities"
3. Find a mentor profile you like
4. Click "Submit Idea"
5. Fill in the form with your startup details
6. Click "Submit"
7. Success! Your idea is submitted

### How to Review Submissions (Mentor)
1. Login as Mentor
2. Click "Startup Submissions"
3. View all submissions from entrepreneurs
4. Click "View" to see full details
5. Click "Shortlist" to accept or "Reject" to decline
6. Status will update in real-time

### How to Track Your Submissions (Entrepreneur)
1. Login as Entrepreneur
2. Click "My Submissions"
3. View all your submitted ideas
4. See the current status (Submitted/Shortlisted/Rejected)
5. Click "View Profile" to see mentor details
6. Click "View Pitch Deck" to see your uploaded file

## Troubleshooting

### Can't Login
- Check your email and password are correct
- Make sure you've created an account first
- Verify backend is running on port 8080

### Can't See Opportunities
- Make sure you're logged in as Entrepreneur
- Verify a Mentor has created a profile
- Refresh the page

### Can't Submit Idea
- Fill in all required fields (marked with *)
- Check that all validations pass
- Make sure backend is running

### Port Already in Use
\`\`\`bash
# Kill the process using the port
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:8080 | xargs kill -9  # Backend
\`\`\`

## Documentation

- **[Quick Start](./QUICK_START.md)** - 3-step quick start
- **[Setup Guide](./STARTUPNEST_SETUP_GUIDE.md)** - Detailed setup
- **[API Documentation](./API_DOCUMENTATION.md)** - API reference
- **[Environment Setup](./ENVIRONMENT_SETUP.md)** - Environment config
- **[Project Summary](./PROJECT_SUMMARY.md)** - Project overview
- **[Visual Guide](./VISUAL_GUIDE.md)** - UI/UX guide

## Next Steps

1. ✓ Get the app running
2. ✓ Create test accounts
3. ✓ Explore both user roles
4. ✓ Test the complete workflow
5. ✓ Read the API documentation
6. ✓ Customize for your needs

## Tips & Tricks

- Use the same browser for testing both roles, or use incognito mode
- Create multiple test accounts to simulate real scenarios
- Check browser console (F12) for any errors
- Use Postman to test API endpoints directly
- MongoDB Compass can help visualize your database

## Need Help?

1. Check the [Setup Guide](./STARTUPNEST_SETUP_GUIDE.md) troubleshooting section
2. Review the [API Documentation](./API_DOCUMENTATION.md)
3. Check the [Visual Guide](./VISUAL_GUIDE.md) for UI reference
4. Verify all services are running
5. Check browser console for errors

## What's Next?

After getting familiar with the app:
- Explore the codebase
- Customize the styling
- Add new features
- Deploy to production
- Integrate with external services

## Support

For detailed information, refer to:
- **Setup Issues:** See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- **API Questions:** See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Project Details:** See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

**You're all set!** Start exploring StartupNest now. 🚀

**Happy building!**
