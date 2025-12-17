

---

```md
# 🚀 TaskMaster – Full-Stack Task Board

TaskMaster is a clean, full-stack task management application built using **FastAPI** (Python) and **React + Tailwind CSS**.  
It was developed as part of a **Vibe Coding Assignment (60 minutes)** to demonstrate rapid full-stack development, clean API design, and a polished, user-friendly interface.

The focus of this project is **simplicity, clarity, and good engineering judgment**, rather than over-engineering.

---

## 🎯 Project Goal

The goal of this assignment was to build a **working end-to-end product** within a tight time constraint that:

- Exposes well-designed backend APIs
- Connects a Python backend to a modern frontend
- Feels clean, responsive, and pleasant to use
- Demonstrates strong full-stack fundamentals

---

## ✨ Features

### Core Features
- ➕ Add new tasks
- 📋 View all tasks
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 📊 Real-time progress indicator

### Additional / Unique Enhancements
- 🌙 Dark / Light mode toggle
- 🎯 Progress bar with completion percentage
- 🏆 “Wins” indicator when tasks are completed
- 🗂️ Task categories (Work, Personal, Health, Learning, Sports)
- 🚦 Priority levels (Low, Medium, High)
- 🎉 Subtle celebratory UI when all tasks are completed

---

## 🧱 Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS**
- **Lucide Icons**
- Modern component-based UI
- Fully responsive design

### Backend
- **FastAPI** (Python)
- RESTful API design
- In-memory task storage (runtime only)
- CORS enabled for frontend integration

---

## 📂 Project Structure

```

TaskMaster-Fullstack/
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── README.md
└── .gitignore

````

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Add a new task |
| PATCH | `/api/tasks/{id}/toggle` | Toggle task completion |
| DELETE | `/api/tasks/{id}` | Delete a task |

> Tasks are stored **in memory** and persist only during runtime, as required.

---

## 🖥️ Running the Project Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
````

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Live Preview

* **Frontend Preview:** Hosted via Replit
* **Backend API:** Hosted via Replit

> The application is fully functional from the shared preview link.

---

## 🎥 Loom Walkthrough

A short Loom video walkthrough demonstrates:

* Application features
* Frontend UI
* Backend API structure
* Code organization

📎 *Loom link provided in submission*

---

## 🧠 Engineering Decisions

* Used **FastAPI** for clean, fast API development
* Chose **in-memory storage** to keep the system simple and focused
* Avoided external databases and services per requirements
* Prioritized UI clarity and usability over feature bloat
* Kept code readable, structured, and Pythonic

---

## ⏱️ Time Constraint Acknowledgement

This project was built under a **60-minute vibe coding constraint**, emphasizing:

* Speed with correctness
* Smart trade-offs
* End-to-end completeness
* Clean UX over over-engineering

---

## ✅ Assignment Checklist

* [x] Python backend (FastAPI)
* [x] Clean REST APIs
* [x] React frontend
* [x] Frontend–backend integration
* [x] Runtime-only storage
* [x] Progress indicator
* [x] Unique UI enhancements
* [x] GitHub repository
* [x] Live preview
* [x] Loom walkthrough

---

## 👤 Author

**Gouthum Kharvi**
Python / GenAI / Full-Stack Developer

---

## 🙌 Final Note

TaskMaster demonstrates the ability to **design, build, and deliver a complete product quickly**, while maintaining code quality, usability, and thoughtful engineering decisions.

```

---



