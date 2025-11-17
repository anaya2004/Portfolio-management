# Portfolio Management System

A full-stack web application for managing projects, clients, contact forms, and newsletter subscriptions.

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- TailwindCSS for styling
- Shadcn/ui for components
- Axios for API calls
- React Router for navigation

**Backend:**
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Multer for file uploads
- Sharp for image processing
- CORS enabled

## Project Structure

```
AnanyaAssesment/
├── backend/                 # Node.js Express server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Helper functions
│   │   └── uploads/        # Uploaded images
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helper functions
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
2. **Install backend dependencies**
3. **Install frontend dependencies**
4. **Set up environment variables**
5. **Start the development servers**

Detailed instructions are provided in respective directories.

## Features

### Landing Page
- Real Estate Theme: Professional consultation, design & marketing
- Responsive Design: Works perfectly on all devices
- Navigation: Smooth scrolling between sections
- **Our Projects Section**: Display all projects with FOR SALE badges
- **Happy Clients Section**: Client testimonials with circular photos
- **Contact Form**: Submit consultation requests
- **Newsletter Subscription**: Stay updated with latest properties

### Admin Panel
- **Project Management**: Full CRUD for real estate projects
- **Client Management**: Manage client testimonials  
- **Contact Form Responses**: View all consultation requests
- **Newsletter Subscriptions**: View and manage subscribers
- **Image Upload & Processing**: Automated image optimization
- **Dashboard**: Overview of all content management

### NEW: Sample Data & Deployment Ready
- Sample Projects: 6 real estate properties pre-loaded
- Sample Testimonials: 5 client reviews included
- Environment Variables: Production-ready configuration
- No Localhost Dependencies: Fully deployable

## Quick Start with Sample Data

```bash
# Backend - Add sample data
cd backend
npm install
npm run seed  # Adds 6 projects, 5 clients, contacts & newsletter data

# Frontend  
cd frontend
npm install
npm start
```

**Your website will now show real estate content immediately!**

## Deployment
**Production Ready!** See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide.

**Quick Deploy:**
- Frontend: Vercel/Netlify (auto-deploy from Git)
- Backend: Railway/Render (environment variables ready)
- Database: MongoDB Atlas (connection string configurable)
