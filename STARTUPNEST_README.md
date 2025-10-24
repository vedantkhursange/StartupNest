# StartupNest - Startup Incubation Platform

A full-stack application connecting entrepreneurs with mentors for startup funding and incubation.

## Project Structure

### Backend (`/backend`)
- **index.js** - Express server setup with MongoDB connection
- **models/** - Mongoose schemas for User, StartupProfile, StartupSubmission
- **controllers/** - Business logic for user, profile, and submission management
- **routes/** - API endpoints for all features
- **utils/authUtils.js** - JWT authentication utilities

### Frontend (`/app/startupnest`)
- **login/** - User authentication page
- **signup/** - User registration page
- **mentor/** - Mentor dashboard and profile management
- **entrepreneur/** - Entrepreneur dashboard and opportunity browsing

## Features

### For Entrepreneurs
- Browse mentor funding opportunities
- Submit startup ideas with pitch decks
- Track submission status (Submitted, Shortlisted, Rejected)
- View mentor profiles and requirements

### For Mentors
- Create and manage startup profiles
- Define funding criteria and preferences
- Review and evaluate startup submissions
- Shortlist or reject ideas

### Authentication
- JWT-based authentication
- Role-based access control (Entrepreneur/Mentor)
- Secure token storage in localStorage

## Technology Stack

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled

**Frontend:**
- Next.js 14 with App Router
- React with TypeScript
- Tailwind CSS for styling
- Aurora background animations
- Shadcn UI components

## Setup Instructions

### Backend Setup
\`\`\`bash
cd backend
npm install
npm start
\`\`\`
Server runs on `http://localhost:8080`

### Frontend Setup
\`\`\`bash
npm install
npm run dev
\`\`\`
Frontend runs on `http://localhost:3000`

## API Endpoints

### User Management
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Login user

### Startup Profiles
- `GET /api/startupProfile/getAllStartupProfiles` - Get all profiles
- `GET /api/startupProfile/getStartupProfileById/:id` - Get profile by ID
- `GET /api/startupProfile/getStartupProfilesByMentorId/:mentorId` - Get mentor's profiles
- `POST /api/startupProfile/addStartupProfile` - Create new profile
- `PUT /api/startupProfile/updateStartupProfile/:id` - Update profile
- `DELETE /api/startupProfile/deleteStartupProfile/:id` - Delete profile

### Startup Submissions
- `POST /api/startupSubmission/getAllStartupSubmissions` - Get all submissions
- `GET /api/startupSubmission/getSubmissionsByUserId/:userId` - Get user's submissions
- `GET /api/startupSubmission/getStartupSubmissionById/:id` - Get submission by ID
- `POST /api/startupSubmission/addStartupSubmission` - Submit new idea
- `PUT /api/startupSubmission/updateStartupSubmission/:id` - Update submission
- `DELETE /api/startupSubmission/deleteStartupSubmission/:id` - Delete submission

## Design Theme

The application uses the Cliste theme with:
- Dark mode background
- Cyan/teal primary color (`oklch(0.7 0.15 142)`)
- Glassmorphism effects with backdrop blur
- Smooth animations and transitions
- Responsive design for all screen sizes

## Validation

### Client-Side
- Email format validation
- Password strength requirements
- Mobile number format (10 digits)
- Required field validation
- Real-time error messages

### Server-Side
- Input validation in controllers
- Unique constraints on email, username, mobile
- Type checking for numeric fields
- Authorization checks with JWT

## Next Steps

1. Complete mentor submission review page
2. Add entrepreneur my-submissions page
3. Implement file upload for pitch decks
4. Add email notifications
5. Create admin dashboard for error logs
6. Add advanced filtering and search
7. Implement payment integration for premium features
