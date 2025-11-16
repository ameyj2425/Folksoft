## A complete full-stack Todo application built with:
1.React (Vite) – Modern, fast frontend
2.Node.js + Express – Backend REST API
3.MySQL – Persistent database
4.AWS EC2 – Hosting and deployment

This repo contains a clean, production-ready folder structure for both frontend and backend.

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



## ⚙️ Environment Variables:
## 1.Backend:
DB_HOST=localhost,.
DB_USER=todo_user,
DB_PASS=yourpassword,
DB_NAME=todo_app,
PORT=8080

## 2.Frontend:
VITE_API_BASE_URL=http://EC2PUBLICIP:8080

### Backend Setup (Node + Express):
cd server,
cp ../.env.example .env,
npm install,
npm start

### Create database::
mysql -u root -p < db/schema.sql
Backend runs at:
http://localhost:8080

### 🎨 Frontend Setup (React + Vite):
cd client,
npm install,
npm run dev,
Frontend runs at:
http://localhost:5173

### 🌐 API Endpoints:
GET    /api/todos,
GET    /api/todos/:id,
POST   /api/todos,
PUT    /api/todos/:id,
PATCH  /api/todos/:id/complete,
DELETE /api/todos/:id,

### ☁️ Deployment on AWS EC2:
1. SSH into instance:
ssh -i todo-key.pem ubuntu@<EC2-IP>,

2. Clone repo:
git clone https://github.com/ameyj2425/Folksoft.git,

3. Backend setup:
cd Folksoft/server,
npm install,
pm2 start index.js --name folksoft-backend,
pm2 save,

4. Frontend build:
cd ../client,
npm install,
npm run build,

### 🛠️ Tech Stack:
1.Frontend:
React + Vite,
Axios,
React Router
CSS

2.Backend:
Node.js,
Express.js,
MySQL,
PM2 (production),
Deployment,
AWS EC2,
Linux/Ubuntu


