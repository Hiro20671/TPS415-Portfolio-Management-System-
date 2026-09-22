# Jeremy Bryan Villanueva - Cinematic Portfolio & Portfolio Management System

[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Framer%20Motion-06B6D4?style=for-the-badge)](http://localhost:5173)
[![Backend](https://img.shields.io/badge/Backend-Django%205%20%7C%20DRF%20%7C%20JWT-0C4B33?style=for-the-badge)](http://127.0.0.1:8000/api)
[![Database](https://img.shields.io/badge/Database-Aiven%20PostgreSQL%20(SSL)-F59E0B?style=for-the-badge)](https://aiven.io)

A production-grade, full-stack personal portfolio and content management system developed for **Jeremy Bryan Villanueva** (Videographer • Video Editor • Full Stack Developer).

---

## 🎬 Architecture Overview

```
React Frontend (Vite + Framer Motion)
           │
           │  (Axios with JWT Bearer Interceptors)
           ▼
Django REST Framework API (SimpleJWT + CORS)
           │
           │  (psycopg2-binary with SSL)
           ▼
Aiven Cloud PostgreSQL Database (or local SQLite fallback)
```

- **Videography as Primary Focus**: Showcases luxury destination wedding films, commercial brand reels, festival documentaries, camera gear (Sony FX3/FX6, anamorphic glass, drones), and DaVinci Resolve color grading.
- **Full Stack Development as Technical Strength**: Features technical projects (Final Hands-on Exam, Book Finder, Student Enrollment Portal, Interactive Media Galleries) with direct GitHub and live preview links.
- **Unified Control Panel (`/admin`)**: A modern management dashboard featuring 9 dedicated CRUD pages with animated modals, search & filtering, and safe delete confirmation dialogs.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
# Navigate to project root
cd c:\hero_section_aiven

# Activate Python virtual environment
.\venv\Scripts\activate

# Navigate to backend
cd portfolio_backend

# Run migrations
python manage.py migrate

# Seed rich initial data for Jeremy
python manage.py seed_portfolio

# Start Django dev server
python manage.py runserver 127.0.0.1:8000
```
Backend will be live at: `http://127.0.0.1:8000/api`

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend
cd c:\hero_section_aiven\portfolio-frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend will be live at: `http://localhost:5173`

---

## ☁️ Aiven PostgreSQL Configuration

The application is natively configured to connect to **Aiven Cloud PostgreSQL** using SSL encryption (`sslmode=require`).

### Step-by-Step Aiven Setup:
1. Sign up or log in to the [Aiven Console](https://console.aiven.io).
2. Click **Create Service** and choose **PostgreSQL**.
3. Select a cloud provider (e.g., AWS, GCP) and a region closest to your location (e.g., Singapore / Asia Southeast).
4. Choose the Free plan or Startup plan, and click **Create Service**.
5. Once your service status is **Running**, go to the **Overview** tab.
6. Copy the connection parameters:
   - **Host**
   - **Port**
   - **User** (default: `avnadmin`)
   - **Password**
   - **Database Name** (default: `defaultdb`)
7. Create or edit `.env` in `portfolio_backend/.env` (or copy from `.env.example`):

```env
DATABASE_NAME=defaultdb
DATABASE_USER=avnadmin
DATABASE_PASSWORD=your_aiven_password_here
DATABASE_HOST=your-aiven-pg-service.aivencloud.com
DATABASE_PORT=18342
DATABASE_SSL_MODE=require
```

8. Run migrations to provision all 9 tables in Aiven:
```bash
python manage.py migrate
python manage.py seed_portfolio
```

> **Automatic Local Fallback**: If `.env` database variables are left blank, the application automatically uses local `db.sqlite3` so you can demo and develop completely offline without any errors!

---

## 🔑 Default Credentials

| Role | Username | Password | Access Route |
| :--- | :--- | :--- | :--- |
| **Superuser / Admin** | `admin` | `AdminPass123!` | `http://localhost:5173/login` |

*(You can also use the one-click "Auto-fill Demo Credentials" button on the login screen).*

---

## 📁 9 Database Models & School Screenshots

| # | Entity Name | Database Table | Route |
| :-: | :--- | :--- | :--- |
| **1** | Personal Information | `portfolio_personalinformation` | `/admin/personal-info` |
| **2** | Educational Background | `portfolio_educationalbackground` | `/admin/education` |
| **3** | Work Experience | `portfolio_workexperience` | `/admin/experience` |
| **4** | Skills | `portfolio_skill` | `/admin/skills` |
| **5** | Services | `portfolio_service` | `/admin/services` |
| **6** | Projects | `portfolio_project` | `/admin/projects` |
| **7** | Certifications | `portfolio_certification` | `/admin/certifications` |
| **8** | Achievements | `portfolio_achievement` | `/admin/achievements` |
| **9** | Contact Information | `portfolio_contactinformation` | `/admin/contact-info` |

See [SCREENSHOTS_GUIDE.md](file:///c:/hero_section_aiven/SCREENSHOTS_GUIDE.md) for detailed descriptions of each screenshot for school submission.

---

## 🎨 Design & Icon System

- **Zero Emojis**: 100% professional SVG icons from `react-icons` (`FaVideo`, `FaFilm`, `FaCode`, `FaCamera`, `FaDatabase`, `FaCertificate`, `FaTrophy`, etc.).
- **Cinematic Dark Theme**: Deep obsidian `#0A0B0E`, warm gold `#F59E0B`, cyber cyan `#06B6D4`, glassmorphic panels (`backdrop-filter: blur(16px)`), and smooth typography.
- **Framer Motion Animations**: Micro-interactions, staggered section entrance reveals, animated progress bars, modal cards, and page load monogram sequence.
