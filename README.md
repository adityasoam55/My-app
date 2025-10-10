MyApp Documentation
A simple, scalable web application with user authentication, a dashboard, and task management features. The app uses React.js with Tailwind CSS for the front-end and Node.js with Express and MongoDB for the back-end.
Table of Contents

Project Overview
Features
Tech Stack
Project Structure
Setup Instructions
API Documentation
Usage
Scaling and Deployment
Troubleshooting

Project Overview
MyApp is a web application that allows users to register, log in, and manage tasks in a personalized dashboard. It includes a responsive UI with a navbar, footer, and task CRUD operations, along with search and filter functionality. The app is designed to be scalable, secure, and user-friendly, with a modern interface using gradients, animations, and Tailwind CSS.
Features

Authentication: User registration and login with JWT-based authentication.
Dashboard: Displays user profile (username, email) and task management section.
Task Management: Create, read, update, and delete (CRUD) tasks associated with the logged-in user.
Search and Filter: Client-side search by task title and filter by task status (All, Completed, Pending).
UI/UX: Responsive navbar with mobile toggle, footer with social links, and animated forms/dashboard with Tailwind CSS.
Security: Password hashing with bcrypt, protected routes with JWT, and CORS configuration.

Tech Stack

Front-end:
React.js (v18.x)
Tailwind CSS (v3.x)
React Router (v6.x)
Axios (for API requests)
React Icons (for navbar and footer icons)

Back-end:
Node.js (v18.x or higher)
Express.js (v4.x)
MongoDB (with Mongoose for ORM)
JWT (jsonwebtoken for authentication)
Bcrypt (bcryptjs for password hashing)

Database: MongoDB (cloud-hosted via MongoDB Atlas)
Environment: dotenv for configuration

Project Structure
my-app/
├── backend/
│ ├── models/
│ │ ├── User.js # User schema (username, email, password)
│ │ └── Task.js # Task schema (title, description, completed, userId)
│ ├── routes/
│ │ ├── auth.js # Auth routes (register, login, dashboard)
│ │ └── tasks.js # Task CRUD routes
│ ├── .env # Environment variables (MONGO_URI, JWT_SECRET, PORT)
│ ├── server.js # Main server file
│ └── package.json
└── frontend/
├── src/
│ ├── components/
│ │ ├── Navbar.js # Responsive navbar with conditional links
│ │ ├── Footer.js # Footer with navigation and social links
│ │ ├── Login.js # Login form with loading state
│ │ ├── Register.js # Registration form with email support
│ │ └── Dashboard.js # Dashboard with profile, tasks, search, and filter
│ ├── App.js # Main app with routing
│ ├── index.js # React entry point
│ └── index.css # Tailwind CSS and custom animations
├── public/
│ └── index.html
├── tailwind.config.js # Tailwind configuration
└── package.json

Setup Instructions
Prerequisites

Node.js (v18.x or higher)
MongoDB Atlas account (for cloud-hosted MongoDB)
Code editor (e.g., VS Code)
Terminal access
Postman or similar tool (optional, for API testing)

Backend Setup

Navigate to the backend/ directory:cd backend

Initialize the project and install dependencies:npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors

Create a .env file in backend/:MONGO_URI=mongodb+srv://<your-username>:<password>@cluster0.mongodb.net/myapp?retryWrites=true&w=majority
JWT_SECRET=<your_jwt_secret_key> # Generate with `openssl rand -hex 32`
PORT=5000

Replace <your-username> and <password> with your MongoDB Atlas credentials.
Start the backend server:node server.js

The server runs on http://localhost:5000.

Frontend Setup

Navigate to the frontend/ directory:cd frontend

Install dependencies:npm install react-router-dom axios tailwindcss postcss autoprefixer react-icons
npx tailwindcss init -p

Start the frontend development server:npm start

Or, if using Vite:npm run dev

The app runs on http://localhost:5174 (or 3000 for Create React App).

Database Setup

Create a MongoDB Atlas cluster and get the connection string.
Ensure MONGO_URI in .env points to your database.
The User and Task collections will be created automatically on first use.

API Documentation
The backend exposes two main route groups: /api/auth for authentication and /api/tasks for task management. All routes are JSON-based and require appropriate headers.
Base URL
http://localhost:5000

Authentication Routes (/api/auth)
POST /api/auth/register
Register a new user.

Request:{
"username": "string",
"email": "string (optional)",
"password": "string"
}

Response:
Success (201):{ "message": "User registered" }

Error (400):{ "error": "Username already exists" }

POST /api/auth/login
Log in a user and return a JWT token.

Request:{
"username": "string",
"password": "string"
}

Response:
Success (200):{ "token": "jwt_token" }

Error (401):{ "error": "Invalid credentials" }

GET /api/auth/dashboard
Fetch user profile (protected route).

Headers:Authorization: Bearer <jwt_token>

Response:
Success (200):{
"message": "Welcome to dashboard",
"user": {
"\_id": "string",
"username": "string",
"email": "string (optional)"
}
}

Error (401/403):{ "error": "No token provided" }
{ "error": "Invalid token" }

Task Routes (/api/tasks)
All routes are protected and require the Authorization: Bearer <jwt_token> header.
GET /api/tasks
Fetch all tasks for the authenticated user.

Response:
Success (200):[
{
"_id": "string",
"title": "string",
"description": "string",
"completed": boolean,
"userId": "string"
},
...
]

Error (401/403):{ "error": "No token provided" }

POST /api/tasks
Create a new task.

Request:{
"title": "string",
"description": "string (optional)"
}

Response:
Success (201):{
"\_id": "string",
"title": "string",
"description": "string",
"completed": false,
"userId": "string"
}

Error (400):{ "error": "Validation error" }

PUT /api/tasks/:id
Update a task by ID.

Request:{
"title": "string",
"description": "string (optional)",
"completed": boolean
}

Response:
Success (200):{
"\_id": "string",
"title": "string",
"description": "string",
"completed": boolean,
"userId": "string"
}

Error (404):{ "error": "Task not found" }

DELETE /api/tasks/:id
Delete a task by ID.

Response:
Success (200):{ "message": "Task deleted" }

Error (404):{ "error": "Task not found" }

Usage

Register: Navigate to /register, enter a username, email (optional), and password. After successful registration, you're automatically logged in and redirected to /dashboard.
Login: Go to /login, enter your username and password. On success, you're redirected to /dashboard.
Dashboard:
View your profile (username, email if provided).
Add tasks via the form (title and description).
Edit or delete tasks using buttons.
Toggle task completion status.
Search tasks by title or filter by status (All, Completed, Pending).

Logout: Click the "Logout" button in the navbar or dashboard to clear the JWT and return to /login.

Scaling and Deployment

Backend:
Use PM2 for process management and clustering.
Add rate limiting (express-rate-limit) for API security.
Deploy on Heroku, Vercel, or AWS with HTTPS and a reverse proxy (e.g., Nginx).

Frontend:
Use code splitting (React.lazy) for performance.
Deploy on Netlify or Vercel.
Optimize images and assets.

Database:
Index MongoDB fields (e.g., username, userId) for faster queries.
Use MongoDB Atlas for managed scaling.

Security:
Validate all inputs to prevent injection.
Use environment variables for secrets.
Enable HTTPS in production.

Troubleshooting

CORS Errors:
Ensure backend/server.js allows your frontend port:app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5174'] }));

Update to match your frontend port (e.g., 5174 for Vite).

API Errors:
Test endpoints with Postman to verify backend functionality.
Check MongoDB connection string in .env.

UI Issues:
Verify react-icons and tailwindcss are installed.
Check browser console for errors.

JWT Issues:
Ensure JWT_SECRET is set in .env and matches across requests.
Clear localStorage if token errors persist.

For further assistance, contact the developer or check the console logs for detailed error messages.
