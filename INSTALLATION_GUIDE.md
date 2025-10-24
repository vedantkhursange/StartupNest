# StartupNest - Installation & Setup Guide

## Prerequisites
- Node.js v14 or higher
- MongoDB v4.4 or higher
- npm or yarn package manager

## Step 1: Install Dependencies

### Frontend Dependencies
\`\`\`bash
cd cliste-website
npm install
npm install react-hot-toast
\`\`\`

### Backend Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

## Step 2: Environment Setup

### Backend Configuration
Create a `.env` file in the backend directory:
\`\`\`
MONGODB_URI=mongodb://127.0.0.1:27017/startupnest
PORT=8080
JWT_SECRET=asdfghjkl
\`\`\`

### Frontend Configuration
The frontend uses `http://localhost:8080` for API calls. Update if your backend runs on a different port.

## Step 3: Start Services

### Terminal 1 - MongoDB
\`\`\`bash
mongod
\`\`\`

### Terminal 2 - Backend
\`\`\`bash
cd backend
npm start
\`\`\`

### Terminal 3 - Frontend
\`\`\`bash
npm run dev
\`\`\`

## Step 4: Access Application
Open your browser and navigate to:
\`\`\`
http://localhost:3000/startupnest
\`\`\`

## Features Included

### Authentication
- User registration with role selection
- Secure login with JWT tokens
- Role-based access control (Mentor/Entrepreneur)
- Smooth login/signup transitions

### Mentor Features
- Create and manage startup profiles
- View all submissions
- Filter submissions by status
- Search submissions by entrepreneur name
- Sort submissions by various criteria
- Shortlist or reject submissions
- Edit and delete profiles
- Pagination support

### Entrepreneur Features
- Browse mentor opportunities
- Search and filter opportunities
- Submit startup ideas
- Track submission status
- View mentor profiles
- Delete submissions (when in submitted state)
- Sort and filter submissions
- Pagination support

### UI/UX Features
- Beautiful Aurora background animations
- Glassmorphism design
- Smooth page transitions
- Toast notifications for all actions
- Loading states with spinners
- Form validation with error messages
- Responsive design
- Dark mode theme

## Troubleshooting

### MongoDB Connection Error
\`\`\`
Error: connect ECONNREFUSED 127.0.0.1:27017
\`\`\`
**Solution**: Ensure MongoDB is running
\`\`\`bash
mongod
\`\`\`

### Port Already in Use
\`\`\`
Error: listen EADDRINUSE: address already in use :::8080
\`\`\`
**Solution**: Kill the process using the port
\`\`\`bash
lsof -ti:8080 | xargs kill -9
\`\`\`

### Module Not Found
\`\`\`
Error: Cannot find module 'react-hot-toast'
\`\`\`
**Solution**: Install missing dependencies
\`\`\`bash
npm install react-hot-toast
\`\`\`

### CORS Errors
**Solution**: Ensure backend is running on port 8080 and frontend on port 3000

### API Connection Issues
**Solution**: Check that the backend URL in frontend matches your backend port

## Development Tips

### Hot Reload
- Frontend automatically reloads on file changes
- Backend requires manual restart

### Debugging
- Use browser DevTools for frontend debugging
- Check console logs for errors
- Use MongoDB Compass to view database

### Testing Accounts
Create test accounts with:
- **Mentor**: mentor@example.com / Mentor@123
- **Entrepreneur**: entrepreneur@example.com / Entrepreneur@123

## Production Deployment

### Build Frontend
\`\`\`bash
npm run build
npm start
\`\`\`

### Deploy Backend
- Use a production MongoDB instance
- Set environment variables
- Use a process manager (PM2)
- Configure CORS for production domain

## Performance Tips
- Use pagination for large datasets
- Implement caching for frequently accessed data
- Optimize images and assets
- Use CDN for static files
- Monitor API response times

## Security Considerations
- Never commit `.env` files
- Use strong JWT secrets
- Validate all user inputs
- Implement rate limiting
- Use HTTPS in production
- Sanitize database queries

## Support & Documentation
- Check ENHANCEMENTS_SUMMARY.md for feature details
- Review API_DOCUMENTATION.md for endpoint details
- Check QUICK_START.md for quick setup
