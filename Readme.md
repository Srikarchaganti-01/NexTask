# Task Management System

A full-stack Task Management application built with the **MERN stack**, allowing users to securely manage their personal tasks through a REST API and an interactive React interface.

The project follows a **backend-first development approach**, focusing on understanding real-world backend concepts such as MVC architecture, JWT authentication, authorization, database operations, and REST API development before integrating the frontend.

---

## Demo Credentials

Use the following credentials to explore the application:

| Account | Email | Password |
|---|---|---|
| Admin | `admin@gmail.com` | `test123` |
| User | `user1@gmail.com` | `test123` |

> **Note:** These are demonstration credentials. Do not use them for real accounts or sensitive information.

---

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| API Testing | Postman |
| Architecture | MVC, REST API |

---

## Features

### Authentication & Security
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes using authentication middleware
- Current authenticated user information
- User-specific authorization
- Secure password handling

### Task Management
- Create, view, update, and delete tasks
- View individual task details
- Task completion and reopening
- Task priority levels
- Task categories
- Task deadlines

### Task Organization
- Search tasks
- Filter by priority
- Filter by completion status
- Sort tasks
- Pagination (planned / skipped in current version)

### Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks
- Recently added tasks

### Deadline Calendar (Version 2.0)
- Monthly calendar view
- Deadline indicators
- Task completion indicators

**Calendar indicators:**
- Red dot — Task deadline
- Green dot — Task completed
- No dot — No task activity

*No notification system is included in the project scope.*

---

## API Documentation

All endpoints use the `/api` base path.

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Protected |

### Task Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/tasks` | Create a task | Protected |
| GET | `/api/tasks` | Get all user's tasks | Protected |
| GET | `/api/tasks/:id` | Get a specific task | Protected |
| PATCH | `/api/tasks/:id` | Update a task | Protected |
| DELETE | `/api/tasks/:id` | Delete a task | Protected |

### Query Parameters

Task listing supports query parameters for organizing tasks.

| Parameter | Example | Purpose |
|---|---|---|
| search | `?search=project` | Search tasks |
| priority | `?priority=high` | Filter by priority |
| completed | `?completed=false` | Filter by status |
| sort | `?sort=deadline` | Sort tasks |
| page | `?page=2` | Page number |
| limit | `?limit=10` | Results per page |

Example:

```http
GET /api/tasks?priority=high&completed=false
```

---

## Project Architecture

The backend follows the **Model-View-Controller (MVC)** architectural pattern.

```text
React Frontend
      |
      v
  API Request
      |
      v
 Express Routes
      |
      v
 Authentication Middleware
      |
      v
   Controllers
      |
      v
  Mongoose Models
      |
      v
    MongoDB
      |
      v
  API Response
      |
      v
 React Frontend
```

### Backend Components

- **Models:** Define database schemas and interact with MongoDB through Mongoose.
- **Views:** The React frontend handles the user interface.
- **Controllers:** Handle application logic and API requests.
- **Routes:** Define API endpoints and connect them to controllers.
- **Middleware:** Handle authentication, authorization, and request processing.

---

## Database Models

### User Model

| Field | Description |
|---|---|
| name | User's name |
| email | Unique email address |
| password | Bcrypt-hashed password |
| createdAt | Account creation timestamp |
| updatedAt | Last update timestamp |

### Task Model

| Field | Description |
|---|---|
| title | Task title |
| description | Task description |
| priority | Low, Medium, or High |
| category | Task category |
| completed | Completion status |
| deadline | Task deadline |
| completedAt | Task completion timestamp |
| userId | Owner of the task |
| createdAt | Task creation timestamp |
| updatedAt | Last update timestamp |

---

## Authentication & Authorization

### Authentication Flow

```text
User Login
    |
    v
Find User in MongoDB
    |
    v
Compare Password using bcrypt
    |
    v
Generate JWT
    |
    v
Return Authentication Token
```

### Protected Request Flow

```text
Client Request
    |
    v
JWT Bearer Token
    |
    v
Authentication Middleware
    |
    v
Verify JWT
    |
    v
Identify User
    |
    v
Execute Controller
    |
    v
Return Response
```

### User Authorization

Every task is associated with its owner through `userId`.

This ensures that users can only access, update, or delete their own tasks.

Unauthorized access attempts are rejected by the backend.

---

## Project Structure

```text
task-management/
|
|-- frontend/
|   |-- src/
|   |-- public/
|   |-- package.json
|   |-- vite.config.js
|
|-- backend/
|   |-- config/
|   |   |-- db.js
|   |
|   |-- controllers/
|   |   |-- authController.js
|   |   |-- taskController.js
|   |
|   |-- middleware/
|   |   |-- authMiddleware.js
|   |
|   |-- models/
|   |   |-- User.js
|   |   |-- Task.js
|   |
|   |-- routes/
|   |   |-- authRoutes.js
|   |   |-- taskRoutes.js
|   |
|   |-- .env
|   |-- app.js
|   |-- package.json
|
|-- README.md
```

---

## Development Progress

### Goal 1 — Backend Development

| Phase | Description | Status |
|---|---|---|
| 1 | Backend Foundation | Completed |
| 2 | MongoDB & Mongoose | Completed |
| 3 | User Registration | Completed |
| 4 | Login & JWT | Completed |
| 5 | Authentication Middleware | Completed |
| 6 | Current User API | Completed |
| 7 | Task Model | Completed |
| 8 | Task CRUD Operations | Completed |
| 9 | User Authorization | Completed |
| 10 | Task Completion & Reopening | Planned |
| 11 | Search, Filter & Sort | In Progress |
| 12 | Pagination | Skipped |
| 13 | Dashboard API | Completed |
| 14 | Calendar API | Version 2.0 |
| 15 | Error Handling | Completed |
| 16 | Security & Cleanup | Completed |
| 17 | Postman Testing | Completed |

### Goal 2 — Frontend Development

| Phase | Description | Status |
|---|---|---|
| 1 | React & Vite Setup | Pending |
| 2 | Authentication UI | Pending |
| 3 | Task Management UI | Pending |
| 4 | Search, Filters & Sorting | Pending |
| 5 | Dashboard UI | Pending |
| 6 | Calendar Integration | Version 2.0 |
| 7 | Final Integration & Deployment | Pending |

---

## Future Improvements

- Complete task status management.
- Implement remaining search and sorting functionality.
- Build a responsive React dashboard.
- Integrate the frontend with the REST API.
- Implement a monthly task calendar.
- Improve UI/UX and loading states.
- Deploy the complete application.

---

## Project Objective

The objective of this project is to gain practical experience in developing a complete full-stack application from the ground up.

Rather than starting directly with the frontend, the project prioritizes backend development to understand how real-world applications handle:

- REST API design
- MVC architecture
- Database management
- Authentication and authorization
- CRUD operations
- Error handling
- API testing
- Frontend-backend integration

**Development Approach:**

```text
GOAL 1 — BACKEND
Node.js + Express.js
        |
        v
   REST API
        |
        v
     MongoDB
        |
        v
 Authentication
        |
        v
  Authorization
        |
        v
  Task Management
        |
        v
  Postman Testing
        |
        v
  Backend Complete

        |

        v

GOAL 2 — FRONTEND
    React + Vite
        |
        v
 Authentication UI
        |
        v
 Task Management UI
        |
        v
     Dashboard
        |
        v
 Calendar Integration
        |
        v
  Complete Application
```

---

**Built as a learning project to understand and implement real-world full-stack development concepts.**
