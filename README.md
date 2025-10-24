# StartupNest - Startup Incubation Platform

A comprehensive full-stack web application connecting entrepreneurs with mentors for startup funding and incubation.

## Overview

StartupNest streamlines the process of:
- **Entrepreneurs** submitting startup ideas and tracking funding opportunities
- **Mentors** managing funding profiles and evaluating startup submissions
- **Real-time** status updates and smart tracking throughout the incubation process

## Quick Links

- [Quick Start Guide](./QUICK_START.md) - Get running in 3 steps
- [Setup Guide](./STARTUPNEST_SETUP_GUIDE.md) - Detailed setup instructions
- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [Environment Setup](./ENVIRONMENT_SETUP.md) - Environment configuration
- [Project Summary](./PROJECT_SUMMARY.md) - Detailed project overview

## Features

### Entrepreneur Features
- Browse mentor funding opportunities
- Submit startup ideas with detailed information
- Track submission status in real-time
- View mentor profiles and funding criteria
- Manage and delete submissions
- Real-time notifications

### Mentor Features
- Create and manage startup funding profiles
- Define funding criteria and preferences
- Review entrepreneur submissions
- Shortlist or reject startup ideas
- Edit and delete profiles
- Filter submissions by status

### General Features
- Secure JWT-based authentication
- Role-based access control
- Client-side and server-side validation
- Beautiful Aurora background animations
- Glassmorphism UI design
- Responsive design for all devices
- Real-time form validation
- Comprehensive error handling

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components
- **Aurora Effects** - Custom animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication

## Getting Started

### Prerequisites
- Node.js v14 or higher
- MongoDB v4.4 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd cliste-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   cd backend && npm install && cd ..
   \`\`\`

3. **Start MongoDB**
   \`\`\`bash
   mongod
   \`\`\`

4. **Start Backend** (Terminal 2)
   \`\`\`bash
   cd backend
   npm start
   \`\`\`

5. **Start Frontend** (Terminal 3)
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access the application**
   - Open http://localhost:3000/startupnest

## Project Structure

\`\`\`
cliste-website/
├── app/
│   ├── startupnest/
│   │   ├── page.tsx                    # Landing page
│   │   ├── login/page.tsx              # Login page
│   │   ├── signup/page.tsx             # Signup page
│   │   ├── mentor/                     # Mentor pages
│   │   └── entrepreneur/               # Entrepreneur pages
│   ├── globals.css                     # Global styles
│   └── layout.tsx                      # Root layout
├── components/                         # React components
├── lib/                                # Utilities
├── backend/                            # Express backend
│   ├── models/                         # MongoDB schemas
│   ├── controllers/                    # Business logic
│   ├── routes/                         # API routes
│   └── utils/                          # Utilities
└── public/                             # Static files
\`\`\`

## API Endpoints

### User Routes
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Login user

### Startup Profile Routes
- `GET /api/startupProfile/getAllStartupProfiles` - Get all profiles
- `POST /api/startupProfile/addStartupProfile` - Create profile
- `PUT /api/startupProfile/updateStartupProfile/:id` - Update profile
- `DELETE /api/startupProfile/deleteStartupProfile/:id` - Delete profile

### Startup Submission Routes
- `POST /api/startupSubmission/addStartupSubmission` - Submit idea
- `GET /api/startupSubmission/getAllStartupSubmissions` - Get all submissions
- `PUT /api/startupSubmission/updateStartupSubmission/:id` - Update submission
- `DELETE /api/startupSubmission/deleteStartupSubmission/:id` - Delete submission

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

## User Flows

### Entrepreneur Flow
1. Sign up as Entrepreneur
2. Login to dashboard
3. Browse mentor opportunities
4. Submit startup idea
5. Track submission status
6. Manage submissions

### Mentor Flow
1. Sign up as Mentor
2. Login to dashboard
3. Create startup profile
4. Review submissions
5. Shortlist or reject ideas
6. Manage profiles

## Database Schema

### User
\`\`\`javascript
{
  userName: String (unique),
  email: String (unique),
  mobile: String (unique),
  password: String,
  role: String (Entrepreneur | Mentor)
}
\`\`\`

### StartupProfile
\`\`\`javascript
{
  mentorId: ObjectId,
  category: String,
  description: String,
  fundingLimit: Number,
  avgEquityExpectation: Number,
  targetIndustry: String,
  preferredStage: String
}
\`\`\`

### StartupSubmission
\`\`\`javascript
{
  userId: ObjectId,
  userName: String,
  startupProfileId: ObjectId,
  marketPotential: Number,
  launchYear: Date,
  expectedFunding: Number,
  status: Number (1: Submitted, 2: Shortlisted, 3: Rejected),
  address: String,
  pitchDeckFile: String
}
\`\`\`

## Validation Rules

- **Email:** Valid format, unique
- **Mobile:** 10 digits, unique
- **Password:** 8+ chars, uppercase, lowercase, number
- **Username:** Unique, required

## Authentication

- JWT-based authentication
- 1-hour token expiration
- Role-based access control
- Protected API endpoints

## Troubleshooting

### Common Issues

**Port already in use:**
\`\`\`bash
# Kill process on port
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:8080 | xargs kill -9  # Backend
\`\`\`

**MongoDB connection failed:**
\`\`\`bash
# Start MongoDB
mongod
# or
brew services start mongodb-community
\`\`\`

**Module not found:**
\`\`\`bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
\`\`\`

See [STARTUPNEST_SETUP_GUIDE.md](./STARTUPNEST_SETUP_GUIDE.md) for more troubleshooting.

## Development

### Available Scripts

\`\`\`bash
# Frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server

# Backend
npm start        # Start backend server
npm run dev      # Start with nodemon
\`\`\`

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Functional components with hooks

## Performance

- MongoDB indexing on frequently searched fields
- Pagination support for large datasets
- Efficient API response structure
- Client-side caching with localStorage
- Optimized component rendering

## Security

- JWT authentication
- Password validation
- Input sanitization
- CORS enabled
- Error handling without exposing sensitive data

## Future Enhancements

- Email verification
- Password reset
- File upload for pitch decks
- Email notifications
- Advanced search and filtering
- User profiles
- Messaging system
- Payment integration
- Analytics dashboard
- Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the [Setup Guide](./STARTUPNEST_SETUP_GUIDE.md)
2. Review [API Documentation](./API_DOCUMENTATION.md)
3. See [Troubleshooting](./STARTUPNEST_SETUP_GUIDE.md#troubleshooting)

## Contact

For support and inquiries, please contact the development team.

---

**StartupNest - Connecting Dreams with Opportunities** 🚀

Built with ❤️ using Next.js, Node.js, and MongoDB
