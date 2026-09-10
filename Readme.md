# Task Management System

A full-stack Task Management application where users can create accounts, securely log in, and manage their personal tasks.

The project is being built with a **backend-first approach** to understand and implement real-world backend concepts before integrating the React frontend.

---

## Project Goals

- Build a complete REST API using Node.js and Express.js
- Learn and implement MVC architecture
- Work with MongoDB and Mongoose
- Implement secure authentication using JWT and bcrypt
- Implement user-specific authorization
- Build complete CRUD functionality
- Implement search, filtering, sorting, and pagination
- Build dashboard statistics
- Create a simple task deadline/completion calendar
- Integrate the backend with a React frontend

---

## Tech Stack

### Frontend

- React
- Vite

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Tokens (JWT)
- bcrypt

### Testing

- Postman

### Architecture

- MVC
- REST API

---

# Features

## Authentication

- User registration
- User login
- JWT authentication
- Get current user
- Password hashing
- Authentication middleware
- User authorization

## Task Management

- Create tasks
- View all tasks
- View a single task
- Update tasks
- Delete tasks
- Mark tasks as completed
- Reopen completed tasks
- Task priority
- Task deadlines
- Task categories

### Priority Levels

- Low
- Medium
- High

## Task Organization

- Search tasks
- Filter tasks
- Sort tasks
- Pagination

## Dashboard

The dashboard will provide:

- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks
- Recently added tasks

## Deadline Calendar

A simple calendar will display task activity.

- **Red dot** → A task is due on that date
- **Green dot** → A task was completed on that date
- **No dot** → Nothing happened on that date

There will be **no notification system**.

---

# API Structure

## Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Login user                     |
| GET    | `/api/auth/me`       | Get current authenticated user |

## Tasks

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/tasks`     | Create a task     |
| GET    | `/api/tasks`     | Get user's tasks  |
| GET    | `/api/tasks/:id` | Get a single task |
| PATCH  | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

Additional functionality such as search, filtering, sorting, and pagination will be implemented using query parameters.

Example:

```text
GET /api/tasks?search=project
GET /api/tasks?priority=high
GET /api/tasks?completed=false
GET /api/tasks?sort=deadline
GET /api/tasks?page=2&limit=10
```

---

# Architecture

The backend follows the MVC architecture.

```text
React Frontend
      ↓
   API Request
      ↓
 Express Route
      ↓
 Authentication Middleware
      ↓
   Controller
      ↓
 Mongoose Model
      ↓
   MongoDB
      ↓
   Response
      ↓
 React Frontend
```

### Routes

Routes define API endpoints and direct requests to the appropriate controllers.

### Controllers

Controllers contain application and business logic.

### Models

Models define MongoDB document structures and handle database interaction through Mongoose.

### Middleware

Middleware handles tasks such as authentication and request processing.

---

# Backend Structure

```text
backend/
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── config/
│   └── db.js
│
├── .env
├── app.js
└── package.json
```

---

# User Model

The User model will contain information such as:

```text
name
email
password
createdAt
updatedAt
```

Passwords will never be stored as plain text.

They will be hashed using **bcrypt** before being stored in MongoDB.

---

# Task Model

The Task model will contain:

```text
title
description
priority
category
completed
deadline
completedAt
userId
createdAt
updatedAt
```

`userId` identifies the owner of the task.

This ensures that users can only access and modify their own tasks.

---

# Authentication Flow

## Registration

```text
User
 ↓
Registration Request
 ↓
Validate Data
 ↓
Hash Password
 ↓
Create User
 ↓
MongoDB
```

## Login

```text
User
 ↓
Login Request
 ↓
Find User
 ↓
Compare Password
 ↓
Generate JWT
 ↓
Return Token
```

## Protected Request

```text
Client
 ↓
JWT
 ↓
Authentication Middleware
 ↓
Verify JWT
 ↓
Identify User
 ↓
Controller
 ↓
MongoDB
```

---

# Authorization

Authentication determines:

> Who are you?

Authorization determines:

> Are you allowed to access this resource?

For example, if User A attempts to update User B's task:

```text
User A
 ↓
JWT Verified
 ↓
User Identified
 ↓
Task Ownership Checked
 ↓
Ownership Doesn't Match
 ↓
403 Forbidden
```

---

# Development Roadmap

## Goal 1 — Backend

### Phase 1 — Backend Foundation ( Done )

- [ ] Initialize Node.js
- [ ] Install dependencies
- [ ] Create backend structure
- [ ] Configure Express
- [ ] Configure environment variables

### Phase 2 — MongoDB & Mongoose ( Done )

- [ ] Connect MongoDB
- [ ] Configure Mongoose
- [ ] Create User model
- [ ] Understand schemas and models

### Phase 3 — Registration ( Done )

- [ ] Registration API
- [ ] Validation
- [ ] Duplicate email handling
- [ ] Password hashing
- [ ] Postman testing

### Phase 4 — Login & JWT ( Done )

- [ ] Login API
- [ ] Password comparison
- [ ] JWT generation
- [ ] JWT expiration

### Phase 5 — Authentication Middleware ( Done )

- [ ] Extract Bearer token
- [ ] Verify JWT
- [ ] Identify authenticated user
- [ ] Protect routes

### Phase 6 — Current User ( Done )

- [ ] `/api/auth/me`
- [ ] Return authenticated user's information

### Phase 7 — Task Model ( Done )

- [ ] Create Task schema
- [ ] Add validation
- [ ] Add user relationship
- [ ] Add timestamps

### Phase 8 — Task CRUD ( Next )

- [ ] Create task
- [ ] Get tasks
- [ ] Get single task
- [ ] Update task
- [ ] Delete task

### Phase 9 — Authorization

- [ ] Verify task ownership
- [ ] Prevent unauthorized access
- [ ] Prevent unauthorized updates
- [ ] Prevent unauthorized deletion

### Phase 10 — Completion

- [ ] Complete task
- [ ] Reopen task
- [ ] Track `completedAt`

### Phase 11 — Search, Filter & Sort

- [ ] Search
- [ ] Priority filtering
- [ ] Category filtering
- [ ] Completion filtering
- [ ] Sorting

### Phase 12 — Pagination

- [ ] Page
- [ ] Limit
- [ ] Skip
- [ ] Total pages

### Phase 13 — Dashboard API

- [ ] Task statistics
- [ ] Completed count
- [ ] Pending count
- [ ] Overdue count
- [ ] Recently added tasks

### Phase 14 — Calendar Data

- [ ] Deadline dates
- [ ] Completion dates
- [ ] Calendar API/data logic

### Phase 15 — Error Handling

- [ ] Validation errors
- [ ] Authentication errors
- [ ] Authorization errors
- [ ] Not-found errors
- [ ] Server errors

### Phase 16 — Security & Cleanup

- [ ] Protect environment variables
- [ ] Secure password handling
- [ ] Validate requests
- [ ] Configure CORS
- [ ] Clean MVC structure

### Phase 17 — Complete Postman Testing

- [ ] Test authentication
- [ ] Test CRUD
- [ ] Test authorization
- [ ] Test filters
- [ ] Test pagination
- [ ] Test error cases

**Backend completion condition:**

> The entire REST API works independently and is fully tested through Postman.

---

# Goal 2 — Frontend

After the backend is complete, the React frontend will be added.

### Phase 1 — React Setup

- [ ] Create React + Vite application
- [ ] Configure React Router
- [ ] Create frontend structure
- [ ] Create API service

### Phase 2 — Authentication UI

- [ ] Register page
- [ ] Login page
- [ ] Authentication state
- [ ] JWT handling
- [ ] Logout
- [ ] Protected routes

### Phase 3 — Task Management UI

- [ ] Dashboard
- [ ] Task list
- [ ] Task cards
- [ ] Create task
- [ ] Edit task
- [ ] Delete task
- [ ] Complete task
- [ ] Task details

### Phase 4 — Task Organization

- [ ] Search
- [ ] Filters
- [ ] Sorting
- [ ] Pagination
- [ ] Categories
- [ ] Priority

### Phase 5 — Dashboard

- [ ] Statistics cards
- [ ] Recently added tasks
- [ ] Pending tasks
- [ ] Completed tasks
- [ ] Overdue tasks

### Phase 6 — Calendar

- [ ] Monthly calendar
- [ ] Deadline indicators
- [ ] Completion indicators

### Phase 7 — Final Integration

- [ ] Connect all frontend features to API
- [ ] Loading states
- [ ] Error handling
- [ ] Empty states
- [ ] Responsive design
- [ ] Final testing
- [ ] Deployment

---

# Final Project Architecture

```text
task-management/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── .env
    ├── app.js
    └── package.json
```

---

# Project Objective

The primary objective of this project is not just to create a task management application, but to gain practical experience building a **real full-stack application from the ground up**.

The project will be developed in two major stages:

```text
GOAL 1
Backend
   ↓
REST API
   ↓
MongoDB
   ↓
Authentication
   ↓
Authorization
   ↓
Task Management
   ↓
Postman Testing
   ↓
Backend Complete

          ↓

GOAL 2
React Frontend
   ↓
API Integration
   ↓
Authentication UI
   ↓
Task Management UI
   ↓
Dashboard
   ↓
Calendar
   ↓
Complete Application
```
