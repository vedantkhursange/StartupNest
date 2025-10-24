# StartupNest - Visual Guide & User Interface

## Application Flow Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    StartupNest Landing Page                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Welcome to StartupNest                              │  │
│  │  Connect innovative entrepreneurs with mentors       │  │
│  │                                                      │  │
│  │  [Get Started]  [Sign In]                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────┬──────────────┬──────────────────────┐    │
│  │ For          │ For Mentors  │ Real-Time Updates    │    │
│  │ Entrepreneurs│              │                      │    │
│  └──────────────┴──────────────┴──────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
    ┌─────────────┐            ┌─────────────┐
    │   Signup    │            │   Signup    │
    │ (Entrepreneur)           │  (Mentor)   │
    └─────────────┘            └─────────────┘
         │                              │
         ▼                              ▼
    ┌─────────────┐            ┌─────────────┐
    │   Login     │            │   Login     │
    └─────────────┘            └─────────────┘
         │                              │
         ▼                              ▼
    ┌──────────────────┐      ┌──────────────────┐
    │ Entrepreneur     │      │ Mentor Dashboard │
    │ Dashboard        │      │                  │
    │                  │      │ • Create Profile │
    │ • Opportunities  │      │ • View Profiles  │
    │ • My Submissions │      │ • Review Subs    │
    └──────────────────┘      └──────────────────┘
         │                              │
         ▼                              ▼
    ┌──────────────────┐      ┌──────────────────┐
    │ Browse Mentor    │      │ Manage Startup   │
    │ Opportunities    │      │ Profiles         │
    └──────────────────┘      └──────────────────┘
         │                              │
         ▼                              ▼
    ┌──────────────────┐      ┌──────────────────┐
    │ Submit Startup   │      │ Review & Filter  │
    │ Idea             │      │ Submissions      │
    └──────────────────┘      └──────────────────┘
         │                              │
         ▼                              ▼
    ┌──────────────────┐      ┌──────────────────┐
    │ Track Status     │      │ Shortlist/Reject │
    │ (Real-time)      │      │ Ideas            │
    └──────────────────┘      └──────────────────┘
\`\`\`

## Page Structure

### Landing Page
\`\`\`
┌─────────────────────────────────────────────────────┐
│  StartupNest  [Login] [Sign Up]                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Welcome to StartupNest                            │
│  Connect innovative entrepreneurs with mentors     │
│                                                     │
│  [Get Started]  [Sign In]                          │
│                                                     │
├─────────────────────────────────────────────────────┤
│  For Entrepreneurs  │  For Mentors  │  Real-Time   │
│  Submit ideas,      │  Create       │  Track       │
│  get mentorship     │  opportunities│  submissions │
└─────────────────────────────────────────────────────┘
\`\`\`

### Login Page
\`\`\`
┌─────────────────────────────────────────────────────┐
│                                                     │
│              Welcome Back                          │
│         Sign in to your StartupNest account        │
│                                                     │
│  Email *                                           │
│  [________________________]                        │
│  ✗ Email is required                              │
│                                                     │
│  Password *                                        │
│  [________________________]                        │
│  ✗ Password is required                           │
│                                                     │
│  [Login]                                           │
│                                                     │
│  Don't have an account? Create your account       │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

### Signup Page
\`\`\`
┌─────────────────────────────────────────────────────┐
│                                                     │
│              Create Account                        │
│            Join StartupNest today                  │
│                                                     │
│  Username *                                        │
│  [________________________]                        │
│                                                     │
│  Email *                                           │
│  [________________________]                        │
│                                                     │
│  Mobile *                                          │
│  [________________________]                        │
│                                                     │
│  Password *                                        │
│  [________________________]                        │
│                                                     │
│  Confirm Password *                                │
│  [________________________]                        │
│                                                     │
│  I am a *                                          │
│  [Entrepreneur ▼]                                  │
│                                                     │
│  [Create Account]                                  │
│                                                     │
│  Already have an account? Sign in                 │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

### Mentor Dashboard
\`\`\`
┌─────────────────────────────────────────────────────┐
│  StartupNest  Home  Startup Profiles ▼  Submissions │
│                                              Logout │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Welcome, John!                                    │
│  Manage your startup funding opportunities        │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │ Create       │  │ My Profiles  │  │ Review   │ │
│  │ Profile      │  │              │  │ Subs     │ │
│  │              │  │              │  │          │ │
│  │ Define your  │  │ View and     │  │ Evaluate │ │
│  │ funding      │  │ manage your  │  │ and      │ │
│  │ criteria     │  │ profiles     │  │ shortlist│ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

### Entrepreneur Dashboard
\`\`\`
┌─────────────────────────────────────────────────────┐
│  StartupNest  Home  Opportunities  My Submissions   │
│                                              Logout │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Welcome, Jane!                                    │
│  Find mentors, submit ideas, secure funding       │
│                                                     │
│  ┌──────────────────────┐  ┌──────────────────────┐│
│  │ Explore              │  │ My Submissions       ││
│  │ Opportunities        │  │                      ││
│  │                      │  │ Track your submitted ││
│  │ Browse mentor        │  │ ideas and their      ││
│  │ funding opportunities│  │ status               ││
│  └──────────────────────┘  └──────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

### Mentor Opportunities (Entrepreneur View)
\`\`\`
┌─────────────────────────────────────────────────────┐
│  StartupNest  Home  Opportunities  My Submissions   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Available Mentor Opportunities                    │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ FinTech Funding - John Mentor               │  │
│  │ Category: FinTech                           │  │
│  │ Funding Limit: $500,000                     │  │
│  │ Equity: 20%                                 │  │
│  │ Stage: MVP                                  │  │
│  │                                             │  │
│  │ [Submit Idea]  [View Profile]               │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ HealthTech Funding - Sarah Mentor           │  │
│  │ Category: HealthTech                        │  │
│  │ Funding Limit: $1,000,000                   │  │
│  │ Equity: 15%                                 │  │
│  │ Stage: Idea                                 │  │
│  │                                             │  │
│  │ [Submit Idea]  [View Profile]               │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

### Submit Idea Form
\`\`\`
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Submit Your Startup Idea                          │
│                                                     │
│  Startup Name *                                    │
│  [________________________]                        │
│                                                     │
│  Market Potential (1-10) *                         │
│  [_____]                                           │
│                                                     │
│  Launch Year *                                     │
│  [____________]                                    │
│                                                     │
│  Expected Funding *                                │
│  [________________________]                        │
│                                                     │
│  Address *                                         │
│  [________________________]                        │
│                                                     │
│  Pitch Deck *                                      │
│  [Choose File]                                     │
│                                                     │
│  [Submit]  [Cancel]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

### Mentor Submissions Review
\`\`\`
┌─────────────────────────────────────────────────────┐
│  StartupNest  Home  Profiles  Submissions           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Startup Submissions                               │
│  Filter: [All ▼]  Search: [_________]              │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ AI Platform - Jane Entrepreneur             │  │
│  │ Market Potential: 8/10                      │  │
│  │ Expected Funding: $250,000                  │  │
│  │ Status: Submitted                           │  │
│  │                                             │  │
│  │ [View]  [Shortlist]  [Reject]               │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ Mobile App - Bob Entrepreneur               │  │
│  │ Market Potential: 7/10                      │  │
│  │ Expected Funding: $150,000                  │  │
│  │ Status: Submitted                           │  │
│  │                                             │  │
│  │ [View]  [Shortlist]  [Reject]               │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

## Color Scheme

- **Primary:** Cyan/Teal (#0ea5e9)
- **Secondary:** Sky Blue (#06b6d4)
- **Background:** Dark (#0f172a)
- **Card:** Semi-transparent with backdrop blur
- **Text:** Light gray on dark background
- **Accent:** Cyan for interactive elements

## Component Hierarchy

\`\`\`
App
├── Layout
│   ├── Aurora Background
│   ├── Navigation
│   └── Main Content
│       ├── Hero Section
│       ├── Features Section
│       ├── Cards
│       ├── Forms
│       └── Modals
└── Footer
\`\`\`

## Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## Animation Effects

- Aurora background with smooth color transitions
- Fade-in animations on page load
- Hover effects on interactive elements
- Smooth transitions on state changes
- Scale transforms on card hover

## Form Validation Feedback

\`\`\`
✓ Valid input
✗ Invalid input with error message
⚠ Warning message
ℹ Info message
\`\`\`

## Status Indicators

- **Submitted:** Blue badge
- **Shortlisted:** Green badge
- **Rejected:** Red badge

---

**Visual Design:** Modern, clean, and professional with smooth animations and glassmorphism effects.
