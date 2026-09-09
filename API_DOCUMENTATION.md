# CareerConnect — Full-Stack Authentication & Security API Documentation

## Base URL
```
http://localhost:8080/api
```

---

## Security & Authentication Overview

- **Authentication Scheme**: Bearer JWT (JSON Web Token)
- **Header Format**: `Authorization: Bearer <JWT_TOKEN>`
- **Password Protection**: Salted Bcrypt Hashing (`rounds = 12`)
- **Sensitive Data Encryption**: AES-256-GCM authenticated encryption/decryption
- **Security Middlewares**: Helmet Security Headers, Express Rate Limiting, Request Payload Limits (`10kb`)

---

## Endpoints Summary

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|---|---|---|---|---|
| `POST` | `/auth/signup` | Register a new student or recruiter account | None | Public |
| `POST` | `/auth/login` | Authenticate user and receive JWT token | None | Public |
| `POST` | `/auth/logout` | Client stateless logout | Bearer Token | Any |
| `GET` | `/auth/me` | Fetch currently authenticated user payload | Bearer Token | Any |
| `PUT` | `/auth/change-password` | Change authenticated user password | Bearer Token | Any |
| `PUT` | `/auth/profile` | Update safe profile details (name, phone, bio) | Bearer Token | Any |
| `GET` | `/users/profile` | Alias to fetch profile details | Bearer Token | Any |
| `PUT` | `/users/profile` | Alias to update profile details | Bearer Token | Any |
| `GET` | `/users` | List all registered users with filter/search | Bearer Token | `admin` |
| `PUT` | `/users/:id` | Update user details by ID | Bearer Token | `admin` |
| `DELETE` | `/users/:id` | Delete user account by ID | Bearer Token | `admin` |

---

## Detailed API Specifications

### 1. Signup / Register
- **HTTP Method**: `POST`
- **Endpoint**: `/api/auth/signup` (or `/api/auth/register`)
- **Request Body**:
```json
{
  "name": "Bhagyashri Sanap",
  "email": "bhagyashri@example.com",
  "password": "Password123!",
  "role": "student",
  "phone": "+91 98765 43210"
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "66e10a2b3c4d5e6f7a8b9c0d",
    "name": "Bhagyashri Sanap",
    "email": "bhagyashri@example.com",
    "role": "student",
    "phone": "+91 98765 43210",
    "avatar": "",
    "bio": "",
    "isActive": true,
    "lastLogin": "2026-09-09T18:00:00.000Z",
    "createdAt": "2026-09-09T18:00:00.000Z"
  }
}
```
- **Error Response (`400 Bad Request` / `409 Conflict`)**:
```json
{
  "success": false,
  "message": "An account with this email address is already registered",
  "errors": {
    "email": "Email is already in use"
  }
}
```

---

### 2. Login
- **HTTP Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Request Body**:
```json
{
  "email": "bhagyashri@example.com",
  "password": "Password123!"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "66e10a2b3c4d5e6f7a8b9c0d",
    "name": "Bhagyashri Sanap",
    "email": "bhagyashri@example.com",
    "role": "student",
    "phone": "+91 98765 43210",
    "isActive": true,
    "lastLogin": "2026-09-09T18:05:00.000Z"
  }
}
```
- **Error Response (`401 Unauthorized`)**:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Get Authenticated User (`GET /api/auth/me`)
- **HTTP Method**: `GET`
- **Endpoint**: `/api/auth/me`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "user": {
    "id": "66e10a2b3c4d5e6f7a8b9c0d",
    "name": "Bhagyashri Sanap",
    "email": "bhagyashri@example.com",
    "role": "student",
    "phone": "+91 98765 43210"
  }
}
```

---

### 4. Change Password (`PUT /api/auth/change-password`)
- **HTTP Method**: `PUT`
- **Endpoint**: `/api/auth/change-password`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
```json
{
  "currentPassword": "Password123!",
  "newPassword": "NewSecurePassword456!",
  "confirmPassword": "NewSecurePassword456!"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 5. Logout (`POST /api/auth/logout`)
- **HTTP Method**: `POST`
- **Endpoint**: `/api/auth/logout`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
