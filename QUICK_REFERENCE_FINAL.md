# StartupNest - Quick Reference Card

## 🚀 Quick Start

\`\`\`bash
# 1. Start MongoDB
mongod

# 2. Start Backend (Terminal 2)
cd backend && npm start

# 3. Start Frontend (Terminal 3)
npm run dev
\`\`\`

Visit: **http://localhost:3000/startupnest**

## 🔑 Environment Variables

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_GEMINI_API_KEY=your_key
NEXT_PUBLIC_API_URL=http://localhost:8080
\`\`\`

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/startupnest
JWT_SECRET=your_secret
PORT=8080
\`\`\`

## 📱 Test Accounts

**Mentor:**
- Email: mentor@example.com
- Password: Mentor@123

**Entrepreneur:**
- Email: entrepreneur@example.com
- Password: Entrepreneur@123

## ✨ New Features

| Feature | Location | Status |
|---------|----------|--------|
| Gemini Chatbot | Bottom-right corner | ✅ Active |
| Search Debouncing | All search inputs | ✅ Active |
| Responsive Design | All pages | ✅ Active |
| Pagination | Submissions & Profiles | ✅ Active |
| Sorting | All list pages | ✅ Active |
| Toast Notifications | All actions | ✅ Active |

## 🔧 Key Files

| File | Purpose |
|------|---------|
| `app/api/chat/route.ts` | Gemini API endpoint |
| `components/chatbot/ChatBot.tsx` | Chatbot UI |
| `lib/hooks/useDebounce.ts` | Search debouncing |
| `app/startupnest/layout.tsx` | Layout with chatbot |

## 📊 API Endpoints

\`\`\`
POST   /user/signup
POST   /user/login
GET    /startupProfile/getAllStartupProfiles
POST   /startupProfile/addStartupProfile
PUT    /startupProfile/updateStartupProfile/:id
DELETE /startupProfile/deleteStartupProfile/:id
POST   /startupSubmission/addStartupSubmission
POST   /startupSubmission/getAllStartupSubmissions
GET    /startupSubmission/getSubmissionsByUserId/:userId
PUT    /startupSubmission/updateStartupSubmission/:id
DELETE /startupSubmission/deleteStartupSubmission/:id
\`\`\`

## 🎨 Responsive Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl)

## 🚢 Deployment

\`\`\`bash
# Vercel (Frontend)
vercel --prod

# Heroku (Backend)
git push heroku main
\`\`\`

See `VERCEL_DEPLOYMENT_GUIDE.md` for details.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB is running |
| API calls fail | Verify API URL in env vars |
| Chatbot not responding | Check Gemini API key |
| Mobile layout broken | Clear cache, hard refresh |
| Search not working | Check debounce delay |

## 📚 Documentation

- `GEMINI_SETUP_GUIDE.md` - Chatbot setup
- `VERCEL_DEPLOYMENT_GUIDE.md` - Deployment
- `ENHANCEMENTS_SUMMARY.md` - Features overview
- `API_DOCUMENTATION.md` - API reference

## 💡 Tips

- Use Chrome DevTools for mobile testing
- Check browser console for errors
- Monitor API calls in Network tab
- Test on actual mobile devices
- Clear localStorage if stuck

## 🎯 Next Steps

1. ✅ Run locally and test all features
2. ✅ Deploy backend to Heroku/Railway
3. ✅ Deploy frontend to Vercel
4. ✅ Add custom domain
5. ✅ Set up monitoring
6. ✅ Configure backups

---

**Ready to deploy?** See `VERCEL_DEPLOYMENT_GUIDE.md`
