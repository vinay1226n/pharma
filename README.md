# Cladian Pharma Website

## Overview

Professional pharma company website with user frontend, admin dashboard, and backend API.

**Company:** Cladian Pharma - Trusted Healthcare Solutions  
**Theme:** Blue (#007BFF), white, light green (#28A745)  
**Assets:** pharma_logo.jpeg, favicon.svg (use as PNG/ICO if needed)

## Project Structure

```
.
├── frontend-user/     # React (Vite + Tailwind)
├── frontend-admin/    # React (Vite + Tailwind)
├── backend/           # Node/Express/MongoDB
├── logo.svg
├── favicon.svg
├── README.md
└── TODO.md
```

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- Gmail for Nodemailer (optional, app password)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
npm run dev
```

Runs on http://localhost:5000

### Frontend-User

```bash
cd frontend-user
npm install
npm run dev
```

http://localhost:5173

### Frontend-Admin

```bash
cd frontend-admin
npm install
npm run dev
```

http://localhost:5174

## Environment Variables (.env)

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
EMAIL_USER=your@gmail.com
EMAIL_PASS=app_password
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Features

**User:** Home, About, Products (search), Contact (email)  
**Admin:** Login (admin@test.com / password), Dashboard (CRUD products), Change Password  
**API:** Protected routes (JWT), image upload (multer), search products.

## Default Admin

Email: admin@cladianpharma.com  
Password: admin123

## Seeding

```bash
cd backend
node seed.js
```

## Testing

1. Start backend.
2. Admin login → Add products.
3. User site → Search products, contact form.
4. Responsive on mobile.

## Tech Stack

- Backend: Express, Mongoose, JWT, bcrypt, Nodemailer, Multer
- Frontend: React (Vite), Tailwind CSS, Axios, React Router
