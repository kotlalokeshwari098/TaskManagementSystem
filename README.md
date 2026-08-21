# 📋 Task Management System

A robust, full-stack **Task Management Application** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This application enables users to manage their daily tasks efficiently with features such as secure JWT authentication, real-time task analytics with visual charts, multi-criteria filtering, searching, server-side pagination, dark/light theme toggling, and task tracking.

---
LIVE LINK: [task-management-system-ten-umber.vercel.app](https://task-management-system-ten-umber.vercel.app/)

## 📁 Directory Structure

```text
taskmanagementsystem/
├── backend/                  # Node.js + Express backend server
│   ├── src/
│   │   ├── config/           # Database configuration (MongoDB connection)
│   │   ├── controllers/      # Route controllers (Auth, Tasks, Analytics)
│   │   ├── middleware/       # Custom middleware (JWT auth protection)
│   │   ├── models/           # Mongoose schemas (User, Task)
│   │   ├── routes/           # Express API route definitions
│   │   └── server.js         # Entry point for backend server
│   ├── .env                  # Backend environment variables
│   └── package.json          # Node dependencies and scripts
│
└── frontend/                 # React + Vite frontend application
    ├── src/
    │   ├── assets/           # Static assets
    │   ├── components/       # Reusable UI components (TaskForm, TaskList, AnalyticsChart, etc.)
    │   ├── context/          # React Context (AuthContext for user state)
    │   ├── pages/            # Page components (Login, Register, Dashboard)
    │   ├── services/         # Axios API instance with auth interceptors
    │   ├── App.jsx           # Client-side router configuration
    │   └── main.jsx          # Entry point for React app
    ├── index.html            # Main HTML template
    ├── vite.config.js        # Vite build tool configuration
    └── package.json          # Frontend dependencies and scripts
```

---

## 🚀 Setup Steps

### Prerequisites
Before running the application, make sure you have the following installed:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (Local instance or MongoDB Atlas cluster URI)

---

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create or verify the `.env` file in the `backend/` root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the backend server:**
   - **Development Mode (with auto-reload):**
     ```bash
     npm run dev
     ```
   - **Production Mode:**
     ```bash
     npm start
     ```
   The backend API will run on `http://localhost:5000`.

---

### 2. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify API Endpoint Configuration:**
   Ensure `frontend/src/services/api.js` points to your backend URL (`http://localhost:5000/api`).

4. **Start the frontend application:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## 🛠️ API Endpoints

All protected endpoints require an `Authorization` header formatted as:
`Authorization: Bearer <JWT_TOKEN>`

### 1. Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user | `{ "name": "John", "email": "john@example.com", "password": "secretpassword" }` |
| `POST` | `/api/auth/login` | Public | Authenticate user & retrieve JWT token | `{ "email": "john@example.com", "password": "secretpassword" }` |
| `GET` | `/api/auth/me` | Protected | Get current authenticated user details | None |
| `GET` | `/api/auth/users` | Protected | Fetch registered users list for task assignment | None |

### 2. Task Management Routes (`/api/tasks`)

| Method | Endpoint | Access | Description | Request / Query Params |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Protected | Create a new task (optional `assignedTo` collaborator) | Body: `{ "title": "Task 1", "description": "Details", "status": "todo", "priority": "high", "dueDate": "2026-09-01", "assignedTo": "<userId>" }` |
| `GET` | `/api/tasks` | Protected | Get user & assigned tasks (with search, filter, scope & pagination) | Query: `scope`, `search`, `status`, `priority`, `page`, `limit`, `sortBy`, `order` |
| `GET` | `/api/tasks/analytics` | Protected | Fetch task summary metrics for analytics | Query: None |
| `PUT` | `/api/tasks/:id` | Protected | Update an existing task (creator or assignee) | Body: Partial or full task updates (`title`, `description`, `status`, `priority`, `dueDate`, `assignedTo`) |
| `PATCH` | `/api/tasks/:id/done` | Protected | Mark a task status directly as `done` | Params: `id` |
| `DELETE` | `/api/tasks/:id` | Protected | Permanently delete a task (task creator only) | Params: `id` |

#### Query Parameters for `GET /api/tasks`:
- `scope` *(string)*: Collaboration filter (`all`, `created`, `assigned`). Default: `all`.
- `search` *(string)*: Case-insensitive search on `title` and `description`.
- `status` *(string)*: Filter by task status (`todo`, `in-progress`, `done`).
- `priority` *(string)*: Filter by priority (`low`, `medium`, `high`).
- `page` *(number)*: Page number for pagination (Default: `1`).
- `limit` *(number)*: Number of items per page (Default: `10`).
- `sortBy` *(string)*: Field to sort by (`createdAt`, `dueDate`, `priority`).
- `order` *(string)*: Sort direction (`asc` or `desc`).

---

## 🎨 Design Decisions

### 1. Modular Architecture (MVC Pattern & Separated Front/Back)
- **Separation of Concerns:** Backend code is partitioned into `models`, `controllers`, `routes`, and `middleware`, ensuring high maintainability and ease of unit testing.
- **Decoupled Frontend:** Built using React with Vite for fast build cycles and HMR (Hot Module Replacement), communicating asynchronously with the Node/Express REST API.

### 2. Stateless Authentication with JWT & Security Measures
- **JSON Web Tokens (JWT):** Adopted for stateless session handling. Tokens are stored client-side in `localStorage` and sent with request headers.
- **Password Security:** Passwords are hashed using `bcryptjs` before persisting to MongoDB, preventing raw credential leakage.
- **Route Guarding:** Backend endpoints are guarded via `authMiddleware`, while client routes are restricted using React's `<ProtectedRoute>` component to prevent unauthenticated access.

### 3. Data Integrity & Isolated User Scopes
- **MongoDB Schema Validation:** Strict Mongoose schemas enforce data types, default values (`status: "todo"`, `priority: "medium"`), and required fields.
- **User Ownership:** Tasks are strictly scoped to the owner (`user: req.user.userId`). Every database query enforces this user context, preventing cross-user data leakage.
- **Business Rules Enforcement:** Task creation validates that `dueDate` cannot be set prior to the current date.

### 4. Efficient Database Querying (Filtering, Sorting & Server-Side Pagination)
- **Server-Side Pagination:** Offloads sorting, regex-based searching, and pagination (`skip`/`limit`) to MongoDB rather than fetching entire datasets into memory, optimizing bandwidth and database response times.
- **Dynamic Aggregation:** `/api/tasks/analytics` calculates completion percentages and status counts dynamically per user on demand.

### 5. Frontend State & UX Enhancements
- **Axios Interceptors:** Intercepts outgoing client requests to automatically attach `Bearer <token>` headers without manual repetitive code.
- **React Context API:** Manages global authentication states (`user`, `token`, `login`, `logout`) lightweightly without the boilerplate overhead of Redux.
- **Interactive Visualizations & Feedback:** Integrates `recharts` for visual task status distribution, `react-hot-toast` for feedback notifications, and dynamic light/dark theme toggles for accessible UI design.
