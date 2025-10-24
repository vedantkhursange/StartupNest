# StartupNest - Complete Setup & Running Guide

## Project Overview

StartupNest is a full-stack application connecting entrepreneurs with mentors for startup funding and incubation. It features role-based access for both Entrepreneurs and Mentors with real-time updates and smart tracking.

## Technology Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **UI Components:** Shadcn UI with custom styling
- **Animations:** Aurora background effects with smooth transitions

## Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional)

## Project Structure

\`\`\`
cliste-website/
├── app/
│   ├── startupnest/
│   │   ├── page.tsx                    # Landing page
│   │   ├── login/page.tsx              # Login page
│   │   ├── signup/page.tsx             # Signup page
│   │   ├── error/page.tsx              # Error page
│   │   ├── mentor/
│   │   │   ├── home/page.tsx           # Mentor dashboard
│   │   │   ├── add-profile/page.tsx    # Add startup profile
│   │   │   ├── view-profiles/page.tsx  # View all profiles
│   │   │   ├── edit-profile/[id]/page.tsx # Edit profile
│   │   │   └── submissions/page.tsx    # Review submissions
│   │   └── entrepreneur/
│   │       ├── home/page.tsx           # Entrepreneur dashboard
│   │       ├── opportunities/page.tsx  # Browse opportunities
│   │       └── my-submissions/page.tsx # View submissions
│   ├── globals.css                     # Global styles
│   └── layout.tsx                      # Root layout
├── components/
│   ├── Aurora.tsx                      # Aurora animation
│   ├── ui/                             # Shadcn UI components
│   └── ...
├── lib/
│   ├── api-client.ts                   # API utilities
│   └── validation.ts                   # Form validation
└── backend/
    ├── index.js                        # Express server
    ├── models/                         # MongoDB schemas
    ├── controllers/                    # Business logic
    ├── routes/                         # API endpoints
    └── utils/                          # Utilities
\`\`\`

## Step 1: Start MongoDB

### On Mac:

\`\`\`bash
# If installed via Homebrew
brew services start mongodb-community

# Or run MongoDB directly
mongod
\`\`\`

You should see: `"Waiting for connections on port 27017"`

## Step 2: Setup Backend

Open a new terminal:

\`\`\`bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
\`\`\`

Expected output:
\`\`\`
Server running on port 8080
Connected to MongoDB
\`\`\`

## Step 3: Setup Frontend

Open another terminal:

\`\`\`bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
\`\`\`

The app will automatically open at `http://localhost:3000`

## Step 4: Access the Application

1. **Landing Page:** `http://localhost:3000/startupnest`
2. **Login:** `http://localhost:3000/startupnest/login`
3. **Signup:** `http://localhost:3000/startupnest/signup`

## User Flows

### Entrepreneur Flow

1. **Sign Up** → Create account as Entrepreneur
2. **Login** → Access entrepreneur dashboard
3. **Explore Opportunities** → Browse mentor funding profiles
4. **Submit Idea** → Submit startup idea to a mentor profile
5. **Track Status** → View submission status (Submitted/Shortlisted/Rejected)
6. **Manage Submissions** → View and delete submissions

### Mentor Flow

1. **Sign Up** → Create account as Mentor
2. **Login** → Access mentor dashboard
3. **Create Profile** → Define funding criteria and preferences
4. **View Profiles** → Manage your startup profiles
5. **Review Submissions** → Evaluate entrepreneur submissions
6. **Shortlist/Reject** → Update submission status

## Test Credentials

After signing up, you can use:
- **Email:** test@example.com
- **Password:** Test@123
- **Role:** Select "Mentor" or "Entrepreneur"

## API Endpoints

### User Routes
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Login user

### Startup Profile Routes
- `GET /api/startupProfile/getAllStartupProfiles` - Get all profiles
- `GET /api/startupProfile/getStartupProfileById/:id` - Get profile by ID
- `GET /api/startupProfile/getStartupProfilesByMentorId/:mentorId` - Get mentor's profiles
- `POST /api/startupProfile/addStartupProfile` - Create profile
- `PUT /api/startupProfile/updateStartupProfile/:id` - Update profile
- `DELETE /api/startupProfile/deleteStartupProfile/:id` - Delete profile

### Startup Submission Routes
- `POST /api/startupSubmission/addStartupSubmission` - Submit idea
- `POST /api/startupSubmission/getAllStartupSubmissions` - Get all submissions
- `GET /api/startupSubmission/getSubmissionsByUserId/:userId` - Get user submissions
- `GET /api/startupSubmission/getStartupSubmissionById/:id` - Get submission by ID
- `PUT /api/startupSubmission/updateStartupSubmission/:id` - Update submission
- `DELETE /api/startupSubmission/deleteStartupSubmission/:id` - Delete submission

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Port 8080 already in use` | Kill process: `lsof -ti:8080 \| xargs kill -9` |
| `MongoDB connection failed` | Ensure MongoDB is running: `brew services list` |
| `npm install fails` | Delete `node_modules` and `package-lock.json`, then run `npm install` again |
| `Module not found errors` | Run `npm install` in both backend and frontend folders |
| `CORS errors` | Ensure backend is running on port 8080 |
| `Cannot find module 'Aurora'` | Ensure all components are in the correct directories |

## Useful Commands

\`\`\`bash
# Stop MongoDB
brew services stop mongodb-community

# Check if MongoDB is running
brew services list

# View backend logs
npm start --verbose

# Clear npm cache
npm cache clean --force

# Kill process on specific port
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:8080 | xargs kill -9  # Backend
\`\`\`

## Features Implemented

### Authentication
- JWT-based authentication
- Role-based access control (Entrepreneur/Mentor)
- Secure token storage in localStorage
- Protected routes with automatic redirection

### Validation
- Client-side validation with regex patterns
- Email format validation
- Mobile number validation (10 digits)
- Password strength validation (8+ chars, uppercase, lowercase, number)
- Server-side validation in controllers

### UI/UX
- Beautiful Aurora background animations
- Glassmorphism design with backdrop blur
- Responsive design for all screen sizes
- Smooth transitions and hover effects
- Alert dialogs for confirmations
- Error messages with helpful guidance

### Database
- MongoDB with Mongoose ODM
- Three main collections: User, StartupProfile, StartupSubmission
- Proper indexing for efficient queries
- Referential integrity with ObjectId references

## Next Steps

1. Create test accounts (one Mentor, one Entrepreneur)
2. As Mentor: Add startup profiles with funding opportunities
3. As Entrepreneur: Browse opportunities and submit startup ideas
4. As Mentor: Review and shortlist/reject submissions
5. Monitor real-time status updates

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify MongoDB is running
4. Check that both backend and frontend servers are running
5. Clear browser cache and localStorage if needed

## Notes

- The application uses localStorage for token storage (suitable for development)
- For production, implement secure HTTP-only cookies
- Add email verification for signup
- Implement password reset functionality
- Add file upload for pitch decks
- Consider adding email notifications

---

**Happy building with StartupNest!** 🚀
