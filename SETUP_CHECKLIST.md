# StartupNest - Complete Setup Checklist

Use this checklist to ensure everything is properly set up.

## Pre-Setup Requirements

- [ ] Node.js v14 or higher installed
- [ ] MongoDB v4.4 or higher installed
- [ ] Git installed (optional)
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command line access
- [ ] At least 2GB RAM available
- [ ] At least 500MB disk space available

## Installation Steps

### Step 1: Project Setup
- [ ] Clone or download the project
- [ ] Navigate to project directory
- [ ] Verify `package.json` exists in root
- [ ] Verify `backend/package.json` exists

### Step 2: Frontend Setup
- [ ] Run `npm install` in project root
- [ ] Wait for installation to complete
- [ ] Verify `node_modules` folder created
- [ ] Verify `package-lock.json` created

### Step 3: Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Wait for installation to complete
- [ ] Verify `node_modules` folder created in backend
- [ ] Return to project root

### Step 4: MongoDB Setup
- [ ] Verify MongoDB is installed
- [ ] Start MongoDB service
- [ ] Verify MongoDB is running on port 27017
- [ ] Test connection with `mongosh`

## Running the Application

### Terminal 1: MongoDB
- [ ] Start MongoDB: `mongod`
- [ ] Verify: "Waiting for connections on port 27017"
- [ ] Keep terminal open

### Terminal 2: Backend
- [ ] Navigate to `backend` folder
- [ ] Run `npm start`
- [ ] Verify: "Server running on port 8080"
- [ ] Verify: "Connected to MongoDB"
- [ ] Keep terminal open

### Terminal 3: Frontend
- [ ] Navigate to project root
- [ ] Run `npm run dev`
- [ ] Verify: "Ready in X.Xs"
- [ ] Verify: "Local: http://localhost:3000"
- [ ] Keep terminal open

## Verification Steps

### Frontend Verification
- [ ] Open browser
- [ ] Navigate to http://localhost:3000/startupnest
- [ ] See StartupNest landing page
- [ ] See "Welcome to StartupNest" heading
- [ ] See "Get Started" and "Sign In" buttons
- [ ] See three feature cards

### Backend Verification
- [ ] Open new terminal
- [ ] Run: `curl http://localhost:8080/api/user/login`
- [ ] Should return an error (expected)
- [ ] Verify backend is responding

### MongoDB Verification
- [ ] Open new terminal
- [ ] Run: `mongosh`
- [ ] Should connect successfully
- [ ] Type: `show dbs`
- [ ] Type: `exit`

## Account Creation

### Create Entrepreneur Account
- [ ] Click "Sign Up" on landing page
- [ ] Fill Username: `entrepreneur1`
- [ ] Fill Email: `entrepreneur@example.com`
- [ ] Fill Mobile: `9876543210`
- [ ] Fill Password: `Entrepreneur@123`
- [ ] Select Role: "Entrepreneur"
- [ ] Click "Create Account"
- [ ] See success message
- [ ] Redirected to login page
- [ ] Login with credentials
- [ ] See entrepreneur dashboard

### Create Mentor Account
- [ ] Click "Sign Up" on landing page
- [ ] Fill Username: `mentor1`
- [ ] Fill Email: `mentor@example.com`
- [ ] Fill Mobile: `9876543211`
- [ ] Fill Password: `Mentor@123`
- [ ] Select Role: "Mentor"
- [ ] Click "Create Account"
- [ ] See success message
- [ ] Redirected to login page
- [ ] Login with credentials
- [ ] See mentor dashboard

## Feature Testing

### Mentor Features
- [ ] Login as mentor
- [ ] See mentor dashboard
- [ ] Click "Startup Profiles" → "Add Profile"
- [ ] Fill all required fields
- [ ] Click "Add Profile"
- [ ] See success message
- [ ] Redirected to view profiles
- [ ] See created profile in list
- [ ] Click "Edit" on profile
- [ ] Modify a field
- [ ] Click "Update Profile"
- [ ] See success message
- [ ] Click "Delete" on profile
- [ ] Confirm deletion
- [ ] Profile removed from list

### Entrepreneur Features
- [ ] Login as entrepreneur
- [ ] See entrepreneur dashboard
- [ ] Click "Mentor Opportunities"
- [ ] See mentor profiles (if any exist)
- [ ] Click "Submit Idea"
- [ ] Fill all required fields
- [ ] Click "Submit"
- [ ] See success message
- [ ] Redirected to opportunities
- [ ] Click "My Submissions"
- [ ] See submitted idea
- [ ] See status as "Submitted"
- [ ] Click "View Profile"
- [ ] See mentor profile details
- [ ] Click "Delete"
- [ ] Confirm deletion
- [ ] Submission removed

### Mentor Review Features
- [ ] Login as mentor
- [ ] Click "Startup Submissions"
- [ ] See entrepreneur submissions (if any)
- [ ] Click "View" on submission
- [ ] See submission details
- [ ] Click "Shortlist"
- [ ] See status updated to "Shortlisted"
- [ ] Click "Reject" on another submission
- [ ] See status updated to "Rejected"

## Validation Testing

### Form Validation
- [ ] Try submitting empty form
- [ ] See validation error messages
- [ ] Try invalid email format
- [ ] See email validation error
- [ ] Try mobile with less than 10 digits
- [ ] See mobile validation error
- [ ] Try password without uppercase
- [ ] See password validation error
- [ ] Try non-matching passwords
- [ ] See confirmation error

## Error Handling

- [ ] Try accessing mentor page as entrepreneur
- [ ] Should redirect to login
- [ ] Try accessing entrepreneur page as mentor
- [ ] Should redirect to login
- [ ] Try accessing without login
- [ ] Should redirect to login
- [ ] Try invalid credentials
- [ ] See error message

## Performance Checks

- [ ] Page loads quickly (< 3 seconds)
- [ ] No console errors (F12)
- [ ] No console warnings
- [ ] Animations are smooth
- [ ] Buttons respond immediately
- [ ] Forms submit without lag

## Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Responsive on mobile (F12 → Toggle device toolbar)
- [ ] Responsive on tablet
- [ ] Responsive on desktop

## Cleanup & Maintenance

- [ ] Clear browser cache
- [ ] Clear localStorage (if needed)
- [ ] Verify no sensitive data in logs
- [ ] Check database for test data
- [ ] Document any issues found

## Final Verification

- [ ] All three services running
- [ ] Frontend accessible at http://localhost:3000/startupnest
- [ ] Backend responding at http://localhost:8080
- [ ] MongoDB connected and working
- [ ] Can create accounts
- [ ] Can login
- [ ] Can perform all user actions
- [ ] No errors in console
- [ ] No errors in terminal

## Troubleshooting Checklist

If something doesn't work:

- [ ] Check all three services are running
- [ ] Check ports are correct (3000, 8080, 27017)
- [ ] Check MongoDB is running
- [ ] Check backend is running
- [ ] Check frontend is running
- [ ] Clear browser cache
- [ ] Restart all services
- [ ] Check for error messages
- [ ] Review troubleshooting guides
- [ ] Check documentation

## Documentation Review

- [ ] Read GETTING_STARTED.md
- [ ] Read QUICK_START.md
- [ ] Read README.md
- [ ] Bookmark API_DOCUMENTATION.md
- [ ] Save STARTUPNEST_SETUP_GUIDE.md for reference
- [ ] Review PROJECT_SUMMARY.md
- [ ] Check VISUAL_GUIDE.md for UI reference

## Next Steps

- [ ] Explore the codebase
- [ ] Customize styling
- [ ] Add new features
- [ ] Deploy to production
- [ ] Set up CI/CD
- [ ] Add more test cases
- [ ] Implement additional features

## Sign-Off

- [ ] All checks completed
- [ ] Application is working
- [ ] Ready for development
- [ ] Ready for testing
- [ ] Ready for deployment

---

**Setup Complete!** ✅

Your StartupNest application is ready to use. 🚀

For any issues, refer to the troubleshooting guides in the documentation.
