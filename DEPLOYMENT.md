# Deployment Guide

This guide explains how to deploy your Portfolio Management System to production.

## Pre-Deployment Checklist

### Fixed Issues:
1. Hardcoded localhost URLs → Now uses environment variables
2. Empty database → Sample data script provided
3. No environment configuration → Production-ready config

## Setup Sample Data

**Before deploying, populate your database with sample data:**

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not done)
npm install

# Run the data seeding script
npm run seed
```

**This will add:**
- 6 sample projects (real estate properties)
- 5 client testimonials 
- 3 contact submissions
- 5 newsletter subscriptions

## Deployment Options

### Option 1: **Vercel + Railway** (Recommended)

#### **Frontend (Vercel):**
1. Push your code to GitHub/GitLab
2. Connect repository to Vercel
3. Set environment variables:
   ```env
   REACT_APP_API_URL=https://your-railway-app.railway.app/api
   REACT_APP_BACKEND_URL=https://your-railway-app.railway.app
   ```
4. Deploy automatically

#### **Backend (Railway):**
1. Connect GitHub repository to Railway
2. Set environment variables:
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-db
   FRONTEND_URL=https://your-vercel-app.vercel.app
   BACKEND_URL=https://your-railway-app.railway.app
   PORT=5000
   ```

### Option 2: **Netlify + Render**

#### **Frontend (Netlify):**
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Environment variables:
   ```env
   REACT_APP_API_URL=https://your-render-app.onrender.com/api
   ```

#### **Backend (Render):**
1. Create new web service
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Set environment variables as above

### Option 3: **Same Domain Deployment**

If deploying frontend and backend on the same domain:

```env
# Frontend .env
REACT_APP_API_URL=/api
REACT_APP_BACKEND_URL=

# Backend .env  
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://yourdomain.com
```

## Database Setup

### **MongoDB Atlas (Recommended):**

1. **Create cluster** at [MongoDB Atlas](https://cloud.mongodb.com)
2. **Get connection string:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio-db?retryWrites=true&w=majority
   ```
3. **Whitelist IP addresses** (0.0.0.0/0 for all IPs)
4. **Update MONGODB_URI** in your deployment environment

### **Seed Production Database:**
```bash
# Set production MongoDB URI
export MONGODB_URI="your-production-mongodb-uri"

# Run seeding
npm run seed
```

## Environment Variables Summary

### **Frontend (.env):**
```env
# Development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BACKEND_URL=http://localhost:5000

# Production  
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_BACKEND_URL=https://your-backend-domain.com

# Or for same domain
REACT_APP_API_URL=/api
REACT_APP_BACKEND_URL=
```

### **Backend (.env):**
```env
# Required
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://your-frontend-domain.com
BACKEND_URL=https://your-backend-domain.com

# Optional
PORT=5000
```

## Quick Deploy Commands

### **Frontend Build:**
```bash
cd frontend
npm install
npm run build
```

### **Backend Build:**
```bash
cd backend
npm install
npm run build
npm start
```

## 🔍 Testing Your Deployment

### **Health Checks:**

1. **Frontend:** Visit your frontend URL
2. **Backend API:** Visit `https://your-backend-domain.com/health`
3. **Database:** Check if projects/clients load on frontend

### **Features to Test:**
- Landing page loads with sample data
- Projects section shows 6 sample properties
- Client testimonials display properly
- Contact form submits successfully 
- Newsletter subscription works
- Admin panel accessible at `/admin`
- Image uploads work in admin

## Troubleshooting

### Common Issues:

1. **"Failed to fetch" errors:**
   - Check CORS configuration
   - Verify API_BASE_URL is correct
   - Ensure backend is running

2. **Empty data:**
   - Run the seed script: `npm run seed`
   - Check MongoDB connection

3. **Build failures:**
   - Clear node_modules and reinstall
   - Check for TypeScript errors

### **Debug URLs:**
```bash
# Test backend health
curl https://your-backend-domain.com/health

# Test API endpoints  
curl https://your-backend-domain.com/api/projects
curl https://your-backend-domain.com/api/clients
```

## Mobile Responsiveness

Your app is fully responsive and works on:
- Desktop (1920px+)
- Tablet (768px+)  
- Mobile (320px+)

## Security Notes

- No API keys hardcoded in frontend
- Environment variables used properly
- CORS configured correctly
- Input validation on all forms

## Performance

- Image optimization (Sharp)
- Code splitting (React)
- CDN ready (static assets)
- SEO friendly (meta tags)

---

## You're Ready to Deploy!

Your application is now **production-ready** with:
- **Sample data** for demonstration
- **Environment-based configuration**
- **Mobile responsiveness**  
- **Clean, modular code**
- **Full CRUD functionality**

**Need help?** Check the troubleshooting section or contact support.

Happy deploying!
