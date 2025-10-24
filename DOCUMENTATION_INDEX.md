# StartupNest - Documentation Index

Complete guide to all documentation files for the StartupNest project.

## Quick Navigation

### For First-Time Users
1. **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Start here! 5-minute quick start
2. **[QUICK_START.md](./QUICK_START.md)** - 3-step setup guide
3. **[README.md](./README.md)** - Project overview

### For Setup & Installation
1. **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** - Detailed environment setup
2. **[STARTUPNEST_SETUP_GUIDE.md](./STARTUPNEST_SETUP_GUIDE.md)** - Complete setup guide with troubleshooting

### For Development
1. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
2. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project architecture and details
3. **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - UI/UX design guide

## Documentation Files

### 📖 GETTING_STARTED.md
**Purpose:** Quick introduction and first-time setup  
**Contains:**
- What is StartupNest
- 5-minute quick start
- First time setup instructions
- Common tasks
- Troubleshooting
- Next steps

**Read this if:** You're new to the project

---

### 🚀 QUICK_START.md
**Purpose:** Fastest way to get running  
**Contains:**
- 3-step setup (MongoDB, Backend, Frontend)
- Access URLs
- User roles overview
- Test account creation
- Common commands
- Checklist

**Read this if:** You want to get running immediately

---

### 📋 README.md
**Purpose:** Main project documentation  
**Contains:**
- Project overview
- Features list
- Technology stack
- Project structure
- API endpoints summary
- User flows
- Database schema
- Getting started
- Troubleshooting

**Read this if:** You want a complete project overview

---

### 🔧 ENVIRONMENT_SETUP.md
**Purpose:** Detailed environment configuration  
**Contains:**
- Prerequisites installation
- Project setup steps
- Running the application
- Verification steps
- Environment variables
- Port configuration
- Stopping services
- Troubleshooting setup issues
- System requirements
- Useful commands

**Read this if:** You're having setup issues or need detailed configuration

---

### 📚 STARTUPNEST_SETUP_GUIDE.md
**Purpose:** Comprehensive setup and troubleshooting guide  
**Contains:**
- Project overview
- Technology stack
- Prerequisites
- Project structure
- Step-by-step setup
- User flows
- Test credentials
- API endpoints
- Troubleshooting guide
- Useful commands
- Features implemented
- Next steps

**Read this if:** You need detailed setup instructions or troubleshooting

---

### 🔌 API_DOCUMENTATION.md
**Purpose:** Complete API reference  
**Contains:**
- Base URL
- Authentication
- User endpoints
- Startup Profile endpoints
- Startup Submission endpoints
- Error responses
- Status codes
- Submission status codes
- Preferred stage options

**Read this if:** You're developing with the API or testing endpoints

---

### 📊 PROJECT_SUMMARY.md
**Purpose:** Detailed project information  
**Contains:**
- Project description
- Key features
- Technology stack
- Project structure
- Database schema
- API endpoints summary
- User flows
- Validation rules
- Security features
- Getting started
- Testing the application
- Performance considerations
- Future enhancements
- Troubleshooting

**Read this if:** You want to understand the project architecture

---

### 🎨 VISUAL_GUIDE.md
**Purpose:** UI/UX design reference  
**Contains:**
- Application flow diagram
- Page structure diagrams
- Color scheme
- Component hierarchy
- Responsive breakpoints
- Animation effects
- Form validation feedback
- Status indicators

**Read this if:** You want to understand the UI/UX design

---

## Quick Reference

### Setup Checklist
- [ ] Install Node.js v14+
- [ ] Install MongoDB v4.4+
- [ ] Clone/download project
- [ ] Install frontend dependencies: `npm install`
- [ ] Install backend dependencies: `cd backend && npm install`
- [ ] Start MongoDB: `mongod`
- [ ] Start backend: `cd backend && npm start`
- [ ] Start frontend: `npm run dev`
- [ ] Access app: http://localhost:3000/startupnest

### Port Reference
| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 8080 | http://localhost:8080 |
| MongoDB | 27017 | mongodb://127.0.0.1:27017 |

### Key URLs
- **Landing Page:** http://localhost:3000/startupnest
- **Login:** http://localhost:3000/startupnest/login
- **Signup:** http://localhost:3000/startupnest/signup
- **Mentor Dashboard:** http://localhost:3000/startupnest/mentor/home
- **Entrepreneur Dashboard:** http://localhost:3000/startupnest/entrepreneur/home

### User Roles
- **Entrepreneur:** Browse opportunities, submit ideas, track status
- **Mentor:** Create profiles, review submissions, shortlist/reject ideas

### Test Credentials
\`\`\`
Entrepreneur:
- Email: entrepreneur@example.com
- Password: Entrepreneur@123

Mentor:
- Email: mentor@example.com
- Password: Mentor@123
\`\`\`

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Port already in use | See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#port-already-in-use) |
| MongoDB won't start | See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#mongodb-issues) |
| npm install fails | See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#npm-issues) |
| Can't login | See [GETTING_STARTED.md](./GETTING_STARTED.md#troubleshooting) |
| API errors | See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#error-responses) |

## Learning Path

### Beginner
1. Read [GETTING_STARTED.md](./GETTING_STARTED.md)
2. Follow [QUICK_START.md](./QUICK_START.md)
3. Explore the UI with test accounts
4. Read [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)

### Intermediate
1. Read [README.md](./README.md)
2. Study [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
4. Explore the codebase

### Advanced
1. Study [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
2. Review [STARTUPNEST_SETUP_GUIDE.md](./STARTUPNEST_SETUP_GUIDE.md)
3. Customize the application
4. Deploy to production

## File Organization

\`\`\`
Documentation Files:
├── GETTING_STARTED.md           # Start here
├── QUICK_START.md               # 3-step setup
├── README.md                    # Project overview
├── ENVIRONMENT_SETUP.md         # Environment config
├── STARTUPNEST_SETUP_GUIDE.md   # Detailed setup
├── API_DOCUMENTATION.md         # API reference
├── PROJECT_SUMMARY.md           # Project details
├── VISUAL_GUIDE.md              # UI/UX guide
└── DOCUMENTATION_INDEX.md       # This file
\`\`\`

## Common Questions

**Q: Where do I start?**  
A: Read [GETTING_STARTED.md](./GETTING_STARTED.md)

**Q: How do I set up the project?**  
A: Follow [QUICK_START.md](./QUICK_START.md)

**Q: What are the API endpoints?**  
A: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

**Q: How do I troubleshoot issues?**  
A: Check [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) or [STARTUPNEST_SETUP_GUIDE.md](./STARTUPNEST_SETUP_GUIDE.md)

**Q: What's the project structure?**  
A: See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

**Q: How does the UI work?**  
A: Read [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)

## Support Resources

- **Setup Help:** [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- **Troubleshooting:** [STARTUPNEST_SETUP_GUIDE.md](./STARTUPNEST_SETUP_GUIDE.md#troubleshooting)
- **API Help:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Project Info:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

## Version Information

- **Next.js:** 14.2.25
- **Node.js:** v14+
- **MongoDB:** v4.4+
- **React:** 18+
- **TypeScript:** Latest

## Last Updated

Documentation created for StartupNest v1.0

---

**Start with [GETTING_STARTED.md](./GETTING_STARTED.md) if you're new to the project!** 🚀
