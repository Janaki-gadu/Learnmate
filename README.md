# 🎓 LearnMate — Collaborative Study & Academic Productivity Platform

A comprehensive MERN-stack collaborative study workspace designed to streamline student productivity. LearnMate combines organized note management, active-recall self-quizzes, collaborative study groups, idea tracking, and real-time national academic contest alerts into a single dashboard.

Developed as a Mini Project Capstone under the **Department of Computer Science & Engineering, MVGR College of Engineering (Autonomous)** in affiliation with the **EduSkills Foundation & AICTE Virtual Internship Program**.

---

## 🚀 Key Features

* **🔐 Authentication & User Profiles:** Secure JWT-based stateless authentication with bcrypt salted password hashing and customizable learner profiles.
* **📝 Notes Workspace:** Full CRUD capabilities with real-time keyword search, category filtering, file attachment support, and prioritized note-pinning.
* **💡 Interactive Idea Box:** Local and remote-synced task prioritization board for tracking learning goals and hackathon concepts.
* **🧠 Knowledge Quizzes:** Interactive self-assessment engine with instant score tracking and evaluation state machines.
* **👥 Study Groups & Discussions:** Category-tagged room directories for peer collaboration and shared academic goals.
* **🔔 Live Notifications:** Integrated broadcast notification engine alerting users to upcoming national hackathons, coding contests, and deadlines.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18 (Vite), Tailwind CSS, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js REST API |
| **Database** | MongoDB Atlas (Cloud NoSQL), Mongoose ODM |
| **Security** | JSON Web Tokens (JWT), Bcrypt.js, CORS |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📂 Project Architecture

```text
learnmate/
├── client/                 # React frontend (Vite)
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── api/            # Axios instance and base config
│   │   ├── assets/         # Images, SVGs, and styles
│   │   ├── components/     # Layout, modals, and reusable UI
│   │   └── pages/          # Dashboard, Notes, Quizzes, StudyGroups
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express REST backend
│   ├── config/             # DB connection settings
│   ├── controllers/        # Route controllers
│   ├── middleware/         # JWT verification middleware
│   ├── models/             # Mongoose schemas (User, Note, Notification)
│   ├── routes/             # Express API endpoints
│   ├── uploads/            # Multer file storage
│   ├── package.json
│   └── server.js           # Server entry point
│
└── README.md
