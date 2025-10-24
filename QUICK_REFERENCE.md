# StartupNest - Quick Reference Guide

## Running the App

### Start All Services
\`\`\`bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend && npm start

# Terminal 3: Frontend
npm run dev
\`\`\`

### Access
\`\`\`
http://localhost:3000/startupnest
\`\`\`

## Test Accounts

### Mentor
- Email: mentor@example.com
- Password: Mentor@123
- Role: Mentor

### Entrepreneur
- Email: entrepreneur@example.com
- Password: Entrepreneur@123
- Role: Entrepreneur

## Key Features

### Search
- Available on all list pages
- Real-time filtering
- Case-insensitive

### Pagination
- Previous/Next buttons
- Page indicator
- Configurable page size

### Sorting
- Multiple sort options
- Ascending/Descending toggle
- Persistent state

### Notifications
- Success: Green toast
- Error: Red toast
- Auto-dismiss: 4 seconds

### Animations
- Page fade-in
- Modal zoom-in
- Button hover effects
- Loading spinners

## API Endpoints

### User
- `POST /user/signup` - Register
- `POST /user/login` - Login

### Startup Profile
- `GET /startupProfile/getAllStartupProfiles` - Get all
- `GET /startupProfile/getStartupProfileById/:id` - Get one
- `GET /startupProfile/getStartupProfilesByMentorId/:mentorId` - Get by mentor
- `POST /startupProfile/addStartupProfile` - Create
- `PUT /startupProfile/updateStartupProfile/:id` - Update
- `DELETE /startupProfile/deleteStartupProfile/:id` - Delete

### Startup Submission
- `POST /startupSubmission/addStartupSubmission` - Submit
- `POST /startupSubmission/getAllStartupSubmissions` - Get all
- `GET /startupSubmission/getSubmissionsByUserId/:userId` - Get by user
- `GET /startupSubmission/getStartupSubmissionById/:id` - Get one
- `PUT /startupSubmission/updateStartupSubmission/:id` - Update
- `DELETE /startupSubmission/deleteStartupSubmission/:id` - Delete

## Query Parameters

### Pagination
\`\`\`
?page=1&pageSize=10
\`\`\`

### Search
\`\`\`
?searchValue=keyword
\`\`\`

### Sorting
\`\`\`
?sortBy=createdAt&sortValue=-1
\`\`\`

### Filtering
\`\`\`
?status=1
\`\`\`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB error | Run `mongod` |
| Port in use | `lsof -ti:8080 \| xargs kill -9` |
| Module not found | `npm install` |
| CORS error | Check backend URL |
| API not responding | Ensure backend running |

## File Structure

\`\`\`
cliste-website/
├── app/
│   ├── startupnest/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── mentor/
│   │   │   ├── home/
│   │   │   ├── add-profile/
│   │   │   ├── view-profiles/
│   │   │   ├── edit-profile/
│   │   │   └── submissions/
│   │   └── entrepreneur/
│   │       ├── home/
│   │       ├── opportunities/
│   │       └── my-submissions/
│   └── layout.tsx
├── lib/
│   ├── toast-provider.tsx
│   └── hooks/
│       └── useToast.ts
└── backend/
    ├── models/
    ├── controllers/
    ├── routes/
    └── index.js
\`\`\`

## Common Tasks

### Add Toast Notification
\`\`\`typescript
import { useToast } from "@/lib/hooks/useToast"

const { success, error } = useToast()
success("Done!")
error("Failed!")
\`\`\`

### Use Search
\`\`\`typescript
const [searchValue, setSearchValue] = useState("")
const filtered = items.filter(item => 
  item.name.includes(searchValue)
)
\`\`\`

### Implement Pagination
\`\`\`typescript
const [page, setPage] = useState(1)
const pageSize = 10
const skip = (page - 1) * pageSize
\`\`\`

### Add Sort
\`\`\`typescript
const [sortBy, setSortBy] = useState("date")
const [sortValue, setSortValue] = useState(-1)
const sorted = items.sort((a, b) => 
  sortValue === 1 ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
)
\`\`\`

## Performance Tips
- Use pagination for large datasets
- Implement search debouncing
- Cache frequently accessed data
- Optimize images
- Use lazy loading

## Security Tips
- Never commit .env files
- Use strong passwords
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting

## Documentation Files
- `ENHANCEMENTS_SUMMARY.md` - Detailed features
- `INSTALLATION_GUIDE.md` - Setup instructions
- `API_DOCUMENTATION.md` - API reference
- `FINAL_SUMMARY.md` - Complete overview
- `QUICK_REFERENCE.md` - This file

## Support
Check documentation files for detailed information on specific features.
