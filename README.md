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
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── api.js              # Axios API wrapper
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend (Node + Express + MySQL)
│   ├── controllers/
│   │   └── todosController.js
│   ├── routes/
│   │   └── todos.js
│   ├── models/
│   │   └── db.js               # MySQL connection config
│   ├── db/
│   │   └── schema.sql          # Database schema
│   ├── scripts/
│   │   └── init-db.mjs
│   ├── index.js                # Backend entry point
│   └── package.json
│
├── docs/                       # Optional documentation
│
├── .env.example                # Template environment variables
├── .gitignore
└── README.md
```

## 🧩 Database Schema
todos Table:
```
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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


