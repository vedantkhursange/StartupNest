# StartupNest - Project Summary

## What is StartupNest?

StartupNest is a comprehensive full-stack web application that connects innovative entrepreneurs with experienced mentors for startup funding and incubation. The platform streamlines the process of submitting startup ideas, managing funding opportunities, and tracking submission status in real-time.

## Key Features

### For Entrepreneurs
✓ Browse mentor funding opportunities  
✓ Submit startup ideas with detailed information  
✓ Track submission status (Submitted/Shortlisted/Rejected)  
✓ View mentor profiles and funding criteria  
✓ Manage and delete submissions  
✓ Real-time status updates  

### For Mentors
✓ Create and manage startup funding profiles  
✓ Define funding criteria and preferences  
✓ Review entrepreneur submissions  
✓ Shortlist or reject startup ideas  
✓ Edit and delete profiles  
✓ Filter submissions by status  

### General Features
✓ Secure JWT-based authentication  
✓ Role-based access control  
✓ Client-side and server-side validation  
✓ Beautiful Aurora background animations  
✓ Glassmorphism UI design  
✓ Responsive design for all devices  
✓ Real-time form validation  
✓ Error handling and user-friendly messages  

## Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Animations:** Custom Aurora effects
- **State Management:** React Hooks
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Middleware:** CORS, Body Parser

### Development Tools
- **Package Manager:** npm
- **Version Control:** Git
- **Database:** MongoDB Community

## Project Structure

\`\`\`
cliste-website/
├── app/
│   ├── startupnest/
│   │   ├── page.tsx                    # Landing page
│   │   ├── login/page.tsx              # Login page
│   │   ├── signup/page.tsx             # Signup page
│   │   ├── error/page.tsx              # Error page
│   │   ├── layout.tsx                  # Layout wrapper
│   │   ├── mentor/
│   │   │   ├── home/page.tsx           # Mentor dashboard
│   │   │   ├── add-profile/page.tsx    # Add profile form
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
├── backend/
│   ├── index.js                        # Express server
│   ├── models/
│   │   ├── User.js                     # User schema
│   │   ├── StartupProfile.js           # Profile schema
│   │   └── StartupSubmission.js        # Submission schema
│   ├── controllers/
│   │   ├── userController.js           # User logic
│   │   ├── startupProfileController.js # Profile logic
│   │   └── startupSubmissionController.js # Submission logic
│   ├── routes/
│   │   ├── userRoutes.js               # User routes
│   │   ├── startupProfileRoutes.js     # Profile routes
│   │   └── startupSubmissionRoutes.js  # Submission routes
│   └── utils/
│       └── authUtils.js                # JWT utilities
└── public/
    └── images/                         # Static images
\`\`\`

## Database Schema

### User Collection
\`\`\`javascript
{
  userName: String (unique, required),
  email: String (unique, required),
  mobile: String (unique, required),
  password: String (required),
  role: String (Entrepreneur | Mentor, required),
  createdAt: Date (default: now)
}
\`\`\`

### StartupProfile Collection
\`\`\`javascript
{
  mentorId: ObjectId (reference to User, required),
  category: String (required, indexed),
  description: String (required),
  fundingLimit: Number (required),
  avgEquityExpectation: Number (required),
  targetIndustry: String (required),
  preferredStage: String (idea | MVP | pre-revenue | scaling | established, required),
  createdAt: Date (default: now)
}
\`\`\`

### StartupSubmission Collection
\`\`\`javascript
{
  userId: ObjectId (reference to User, required),
  userName: String (required),
  startupProfileId: ObjectId (reference to StartupProfile, required),
  submissionDate: Date (required),
  marketPotential: Number (required),
  launchYear: Date (required),
  expectedFunding: Number (required),
  status: Number (1: Submitted, 2: Shortlisted, 3: Rejected, default: 1),
  address: String (required),
  pitchDeckFile: String (required)
}
\`\`\`

## API Endpoints Summary

### User Endpoints
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Login user

### Startup Profile Endpoints
- `GET /api/startupProfile/getAllStartupProfiles` - Get all profiles
- `GET /api/startupProfile/getStartupProfileById/:id` - Get profile by ID
- `GET /api/startupProfile/getStartupProfilesByMentorId/:mentorId` - Get mentor's profiles
- `POST /api/startupProfile/addStartupProfile` - Create profile
- `PUT /api/startupProfile/updateStartupProfile/:id` - Update profile
- `DELETE /api/startupProfile/deleteStartupProfile/:id` - Delete profile

### Startup Submission Endpoints
- `POST /api/startupSubmission/addStartupSubmission` - Submit idea
- `POST /api/startupSubmission/getAllStartupSubmissions` - Get all submissions
- `GET /api/startupSubmission/getSubmissionsByUserId/:userId` - Get user submissions
- `GET /api/startupSubmission/getStartupSubmissionById/:id` - Get submission by ID
- `PUT /api/startupSubmission/updateStartupSubmission/:id` - Update submission
- `DELETE /api/startupSubmission/deleteStartupSubmission/:id` - Delete submission

## User Flows

### Entrepreneur Journey
1. **Sign Up** → Create account with email, password, and role
2. **Login** → Access entrepreneur dashboard
3. **Explore** → Browse available mentor funding opportunities
4. **Submit** → Submit startup idea to a mentor profile
5. **Track** → Monitor submission status in real-time
6. **Manage** → View, edit, or delete submissions

### Mentor Journey
1. **Sign Up** → Create account with email, password, and role
2. **Login** → Access mentor dashboard
3. **Create** → Define startup funding profiles with criteria
4. **Manage** → Edit or delete profiles as needed
5. **Review** → Evaluate entrepreneur submissions
6. **Decide** → Shortlist or reject startup ideas

## Validation Rules

### Email
- Must be valid email format (user@domain.com)
- Must be unique in database

### Mobile
- Must be exactly 10 digits
- Must be unique in database

### Password
- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number

### Username
- Must be unique in database
- Required field

## Security Features

✓ JWT-based authentication with 1-hour expiration  
✓ Password hashing (recommended for production)  
✓ Role-based access control  
✓ Protected API endpoints  
✓ CORS enabled for frontend communication  
✓ Input validation on client and server  
✓ Error handling without exposing sensitive data  

## Getting Started

### Quick Start (3 Steps)

1. **Start MongoDB**
   \`\`\`bash
   mongod
   \`\`\`

2. **Start Backend**
   \`\`\`bash
   cd backend
   npm install
   npm start
   \`\`\`

3. **Start Frontend**
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

### Access the Application
- Landing: http://localhost:3000/startupnest
- Login: http://localhost:3000/startupnest/login
- Signup: http://localhost:3000/startupnest/signup

## Testing the Application

### Create Test Accounts

**Mentor Account:**
- Username: mentor1
- Email: mentor@example.com
- Mobile: 9876543210
- Password: Mentor@123
- Role: Mentor

**Entrepreneur Account:**
- Username: entrepreneur1
- Email: entrepreneur@example.com
- Mobile: 9876543211
- Password: Entrepreneur@123
- Role: Entrepreneur

### Test Workflow

1. Create mentor account and add a startup profile
2. Create entrepreneur account and browse opportunities
3. Submit a startup idea as entrepreneur
4. Review submissions as mentor
5. Shortlist or reject ideas

## Performance Considerations

- MongoDB indexing on frequently searched fields
- Pagination support for large datasets
- Efficient API response structure
- Client-side caching with localStorage
- Optimized component rendering with React

## Future Enhancements

- Email verification for signup
- Password reset functionality
- File upload for pitch decks
- Email notifications
- Advanced search and filtering
- User profiles and avatars
- Messaging system between mentors and entrepreneurs
- Payment integration for premium features
- Analytics dashboard
- Mobile app version

## Troubleshooting

See `STARTUPNEST_SETUP_GUIDE.md` for detailed troubleshooting steps.

## Support & Documentation

- **Setup Guide:** `STARTUPNEST_SETUP_GUIDE.md`
- **Quick Start:** `QUICK_START.md`
- **API Documentation:** `API_DOCUMENTATION.md`

---

**StartupNest - Connecting Dreams with Opportunities** 🚀
