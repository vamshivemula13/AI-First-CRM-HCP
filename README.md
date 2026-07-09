# MedIQ

An AI-powered Customer Relationship Management (CRM) application designed for Pharmaceutical Sales Representatives to efficiently manage Healthcare Professionals (HCPs), track doctor interactions, schedule follow-ups, and leverage AI assistance for CRM tasks.

---

## 🚀 Features

### 👨‍⚕️ HCP Management
- Add new doctors (Healthcare Professionals)
- View all doctors
- Doctor profile page
- Delete doctor records

### 📝 Interaction Management
- Record doctor interactions
- Meeting / Call tracking
- Discussion summary
- Follow-up scheduling
- Mark interactions as **Pending** or **Completed**
- View complete interaction history

### 📊 Dashboard
- Total Doctors
- Total Interactions
- Upcoming Follow-ups
- Modern analytics cards

### 🤖 AI CRM Assistant
- AI-powered chatbot using **Groq LLM**
- Built with **LangGraph**
- Helps summarize interactions
- Assists pharmaceutical sales representatives

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- JavaScript
- CSS3

## Backend
- FastAPI
- Python
- SQLAlchemy
- Pydantic

## Database
- TiDB Cloud (MySQL Compatible)

## AI
- Groq API
- LangGraph

---

# 📂 Project Structure

```
AI-First-CRM-HCP/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── tools/
│   │   └── langgraph/
│   │
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 📸 Screenshots

> Add screenshots after deployment.

- Dashboard
- Doctor Management
- Doctor Profile
- Interaction Management
- AI Chat Assistant

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/vamshivemula13/AI-First-CRM-HCP.git

cd AI-First-CRM-HCP
```

---

# Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=your_tidb_connection_string

GROQ_API_KEY=your_groq_api_key
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# API Endpoints

## HCP

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/hcps/` | Get all doctors |
| POST | `/api/hcps/` | Add doctor |
| DELETE | `/api/hcps/{id}` | Delete doctor |

---

## Interactions

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/interactions/` | Add interaction |
| GET | `/api/interactions/` | Get all interactions |
| GET | `/api/interactions/history/{hcp_id}` | Get interaction history |
| GET | `/api/interactions/followups/` | Upcoming follow-ups |

---

## AI Chat

| Method | Endpoint |
|---------|----------|
| POST | `/api/chat/` |

---

# Future Improvements

- Edit Doctor Information
- Search & Filter Doctors
- Authentication
- User Roles
- File Uploads
- Notifications
- Email Follow-up Reminders
- Charts & Reports

---

# Skills Demonstrated

- Full Stack Development
- REST API Design
- AI Integration
- LangGraph Workflows
- Database Design
- SQLAlchemy ORM
- React State Management
- FastAPI Development
- CRUD Operations
- Dashboard Development
- Responsive UI Design

---

# Author

**Vamshi Krishna**

- GitHub: https://github.com/vamshivemula13
- LinkedIn: www.linkedin.com/in/vamshikrishnavemula 

---

# License

This project is intended for educational and portfolio purposes.
