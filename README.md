# 🚀 CareerConnect — Full-Stack Job Portal Platform

![CareerConnect Banner](https://img.shields.io/badge/CareerConnect-Job%20Portal-6366f1?style=for-the-badge&logo=rocket)
![Developer](https://img.shields.io/badge/Developer-Bhagyashri%20Sanap-22c55e?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)

> Created & Maintained by **Bhagyashri Sanap** ([@bhagyashrisanap15](https://github.com/bhagyashrisanap15))

**CareerConnect** is a state-of-the-art, full-stack recruitment and job search web application designed to connect students and job seekers with recruiters and companies. Built with the **MERN** stack (MongoDB, Express, React, Node.js), modern tooling (**Vite**, **Tailwind CSS v4**), and robust security practices, CareerConnect delivers a seamless career management experience.

---

## ✨ Features

### 🎓 Student / Job Seeker Portal
- **Job Discovery & Search**: Filter jobs by category, job type (Full-time, Part-time, Internship, Remote), location, and salary range.
- **One-Click Application**: Apply directly to jobs with an attached resume and customized cover letter.
- **Saved Jobs**: Bookmark preferred job postings for quick reference.
- **Application Tracking**: Real-time dashboard to track application status (*Pending*, *Reviewed*, *Shortlisted*, *Accepted*, *Rejected*).
- **Profile Management**: Maintain academic records, skill badges, personal details, and upload resume documents.

### 🏢 Recruiter Portal
- **Job Posting & Management**: Post new job openings, edit active listings, update requirements, or close expired postings.
- **Company Branding**: Build and manage company profiles with logos, company size, website links, and descriptions.
- **Applicant Review Dashboard**: View candidate applications, inspect candidate profiles, download resumes, and update recruitment status.

### 🛡️ Admin Management
- **User Governance**: Monitor and manage registered users (Students, Recruiters, Admins) with role management and activation controls.
- **Category Management**: Create, update, or reorganize job categories and industry sectors.
- **Platform Analytics**: High-level metrics for user signups, job postings, and job applications.

### 🔐 Security & Authentication Architecture
- **Stateless JWT Authentication**: Secure Bearer Token authorization workflow.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for `student`, `recruiter`, and `admin` roles.
- **Password Security**: Salted Bcrypt hashing (`rounds = 12`).
- **Data Protection & Encryption**: AES-256-GCM authenticated encryption for sensitive profile data.
- **Middlewares**: Express Rate Limiting, Helmet Security Headers, and CORS origin restrictions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons & Alerts**: [Lucide React](https://lucide.dev/), [React Hot Toast](https://react-hot-toast.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Linter**: [Oxlint](https://oxc-project.github.io/)

### Backend
- **Runtime Environment**: [Node.js](https://nodejs.org/)
- **Web Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Authentication**: `jsonwebtoken`, `bcryptjs`
- **Security**: `helmet`, `express-rate-limit`
- **File Uploads**: `multer`
- **Dev Tooling**: `nodemon`

---

## 📁 Repository Structure

```
CareerConnect/
├── client/                   # React Frontend (Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/       # Reusable UI Components (Auth, Common, Jobs)
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── hooks/            # Custom Hooks (useAuth, etc.)
│   │   ├── layouts/          # Navbar, Footer, Dashboard Layouts
│   │   ├── pages/            # Page Views (Public, Auth, Student, Recruiter, Admin)
│   │   ├── services/         # API Service Calls & Axios Instances
│   │   └── utils/            # Helper Functions & Formatting Utilities
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Node.js Express Backend API
│   ├── controllers/          # API Controllers (Auth, Jobs, Applications, Users)
│   ├── middleware/           # Security, Auth Guard, Upload & Error Middlewares
│   ├── models/               # Mongoose Data Schemas (User, Job, Application, Company, etc.)
│   ├── routes/               # Express Route Handlers
│   ├── uploads/              # Local Storage for Resumes & Avatars
│   ├── utils/                # Crypto, JWT, and Helper Utilities
│   ├── index.js              # Express Application Entry Point
│   └── package.json
│
├── API_DOCUMENTATION.md      # Detailed REST API Specifications
└── README.md                 # Project Overview & Setup Guide
```

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local instance running on `mongodb://localhost:27017` or a MongoDB Atlas URI.

---

### Installation & Local Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/bhagyashrisanap15/CareerConnect.git
cd CareerConnect
```

#### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/careerconnect
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
ENCRYPTION_KEY=32_byte_hex_string_for_aes_256_gcm
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
# Development mode with Nodemon
npm run dev

# Production mode
npm start
```
The server will start at `http://localhost:8080`.

#### 3. Frontend Setup
Open a new terminal tab and navigate to `client`:
```bash
cd client
npm install
```

Create a `.env` file inside the `client/` directory (optional):
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Start the Vite development server:
```bash
npm run dev
```
The frontend will be running at `http://localhost:5173`.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access Level |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new Student or Recruiter account | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | Public |
| `GET` | `/api/auth/me` | Fetch current user profile | Authenticated |
| `PUT` | `/api/auth/profile` | Update profile information | Authenticated |
| `PUT` | `/api/auth/change-password` | Update account password | Authenticated |
| `GET` | `/api/jobs` | Search & list all active jobs | Public |
| `POST` | `/api/jobs` | Post a new job opportunity | Recruiter |
| `GET` | `/api/applications` | List applications submitted or received | Student / Recruiter |
| `POST` | `/api/applications` | Apply for a job posting | Student |
| `GET` | `/api/users` | Manage all registered users | Admin |

> For complete API request/response samples, refer to [API_DOCUMENTATION.md](file:///c:/Users/Anil/Desktop/CareerConnect/API_DOCUMENTATION.md).

---

## 👩‍💻 Author

**Bhagyashri Sanap**
- **GitHub**: [@bhagyashrisanap15](https://github.com/bhagyashrisanap15)
- **Role**: Lead Full-Stack Developer & Architect

---

## 📄 License

This project is licensed under the **ISC License**.
