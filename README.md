# A full-stack Todo application
This repo contains a clean, production-ready folder structure for both frontend and backend.
## 🌟 Features
- ➕ Add new To-Do items  
- 👀 View list of all tasks  
- ✔️ Mark tasks as completed / not completed  
- ✏️ Edit existing tasks  
- 🗑️ Delete tasks  
- 💾 Data stored persistently in MySQL  
- ⚛️ Frontend built with React (Vite)  
- 🟦 Backend built with Node.js + Express  
- 📦 Frontend build served through backend  
- ☁️ Deployed on AWS EC2 Ubuntu instance  

> **Note:** Authentication/authorization is NOT implemented in this version.


## 🏗️ Architecture Overview
### 1. Client (Frontend)
- React (Vite)
- Axios for API calls
- React Router (optional)
- Communicates with backend via REST API

### 2. Server (Backend)
- Node.js + Express
- REST API for CRUD operations
- Serves production React build (dist)
- Database: MySQL (Local / AWS RDS)
- Single table: todos

## 📁 Project Structure

```
Folksoft/
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD workflow
│
├── client/                      # Frontend (React + Vite)
│   ├── dist/
│   │   ├── assets/              # Built static assets (JS/CSS)
│   │   └── index.html           # Built HTML (production)
│   ├── node_modules/            # Frontend dependencies
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   └── ...              
│   │   ├── pages/               # Page-level components
│   │   │   ├── AddTodo.jsx
│   │   │   ├── EditTodo.jsx
│   │   │   └── Home.jsx
│   │   ├── api.js               # Axios API wrapper
│   │   ├── index.js             # Root React component / router
│   │   ├── main.jsx             # Vite entry point
│   │   └── styles.css           # Global styles
│   ├── .env.local               # Frontend env (local dev)
│   ├── index.html               # Vite HTML template (dev)
│   ├── package.json             # Frontend scripts & deps
│   ├── package-lock.json
│   └── vite.config.js           # Vite configuration
│
├── server/                      # Backend (Node + Express + MySQL)
│   ├── controllers/
│   │   └── todosController.js   # Controller: To-Do handlers
│   ├── db/
│   │   └── schema.sql           # Database schema (todos table)
│   ├── models/
│   │   └── db.js                # MySQL connection / pool
│   ├── routes/
│   │   └── todos.js             # Express routes for /api/todos
│   ├── scripts/
│   │   └── init-db.mjs          # Script to initialize DB (optional)
│   ├── node_modules/            # Backend dependencies
│   ├── .env.example             # Sample backend env variables
│   ├── index.js                 # Backend entry point
│   ├── package.json             # Backend scripts & deps
│   └── package-lock.json
│
├── Dockerfile                   # Docker image definition (backend)
├── .gitignore                   # Git ignore rules
├── package-lock.json            # Root lockfile (if used)
└── README.md                    # Project documentation

```

## 🧩 Database Schema
todos Table:
```
-- Create the database
CREATE DATABASE IF NOT EXISTS todo_app
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Create user (for RDS or remote access use '%')
CREATE USER IF NOT EXISTS 'todo_user'@'%' IDENTIFIED BY 'aj2004@AJ';

-- Grant this user full access ONLY to todo_app DB
GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'%';

FLUSH PRIVILEGES;

```


## ⚙️ Environment Variables:
## 1.Backend:
- DB_HOST=localhost,.
- DB_USER=todo_user,
- DB_PASS=yourpassword,
- DB_NAME=todo_app,
- PORT=8080

## 2.Frontend:
- VITE_API_BASE_URL=http://EC2PUBLICIP:8080

### Backend Setup (Node + Express):
- cd server,
- cp ../.env.example .env,
- npm install,
- npm start

### Create database::
- mysql -u root -p < db/schema.sql
- Backend runs at:
- http://localhost:8080

### 🎨 Frontend Setup (React + Vite):
- cd client,
- npm install,
- npm run dev,
- Frontend runs at:
- http://localhost:5173

### 🌐 API Endpoints:
- GET    /api/todos,
- GET    /api/todos/:id,
- POST   /api/todos,
- PUT    /api/todos/:id,
- PATCH  /api/todos/:id/complete,
- DELETE /api/todos/:id,

### ☁️ Deployment on AWS EC2:
1. SSH into instance:
- ssh -i todo-key.pem ubuntu@<EC2-IP>,

2. Install Node & Git
- sudo apt update
- sudo apt install -y nodejs npm git,

3. Clone repo:
- git clone https://github.com/ameyj2425/Folksoft.git,

4. Backend setup:
- cd server
- npm install
- pm2 start index.js --name folksoft-backend
- pm2 save

5. Frontend build:
- cd ../client,
- npm install,
- npm run build,

6. Restart build
- pm2 restart folksoft-backend


### 🛠️ Tech Stack:
#### 1.Frontend:
- React + Vite,
- Axios,
- React Router
- CSS

#### 2.Backend:
- Node.js,
- Express.js,
- MySQL,
- PM2 (production),
- Deployment,
- AWS EC2,
- Linux/Ubuntu


