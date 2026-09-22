# PORTFOLIO MANAGEMENT SYSTEM
### Django REST Framework + React + Aiven PostgreSQL Cloud Database
**Project Owner:** Jeremy Bryan Villanueva  
**Title:** Videographer • Video Editor • Full Stack Developer  
**System URL:** `http://localhost:5173` | **Admin Portal:** `http://localhost:5173/admin`  
**Demo Credentials:** Username: `admin` | Password: `AdminPass123!`

---

This document outlines the **9 required database UI screenshots** corresponding to the 9 primary database entities of the Portfolio Management System for academic submission and project demonstration.

---

### Screenshot 1: Personal Information Management
- **Route:** `http://localhost:5173/admin/personal-info`
- **Database Table:** `portfolio_personalinformation`
- **Component:** `src/pages/admin/PersonalInfoManagement.jsx`
- **Description:**  
  Demonstrates the CRUD interface for managing Jeremy Bryan Villanueva's core biographical data, professional positioning (highlighting videography as the primary creative focus and full-stack software development as a technical strength), contact details, and the 4 animated metric counters (Years Experience, Projects Completed, Client Works, Technologies & Gear).

---

### Screenshot 2: Educational Background Management
- **Route:** `http://localhost:5173/admin/education`
- **Database Table:** `portfolio_educationalbackground`
- **Component:** `src/pages/admin/EducationManagement.jsx`
- **Description:**  
  Demonstrates the management table and animated modal for Jeremy's formal educational degrees (e.g., Bachelor of Arts in Digital Filmmaking at De La Salle - College of Saint Benilde and Associate in Computer Science & Web Technology at Mapúa University), complete with honors, year ranges, and course descriptions.

---

### Screenshot 3: Work Experience Management
- **Route:** `http://localhost:5173/admin/experience`
- **Database Table:** `portfolio_workexperience`
- **Component:** `src/pages/admin/ExperienceManagement.jsx`
- **Description:**  
  Demonstrates the career experience management interface, documenting roles such as Lead Videographer & Senior Editor at Kinetic Visuals Studios, Junior Full Stack Developer at Nexus Media, and Video Editor at Apex Creative, with employment types, dates, and locations.

---

### Screenshot 4: Skills Management
- **Route:** `http://localhost:5173/admin/skills`
- **Database Table:** `portfolio_skill`
- **Component:** `src/pages/admin/SkillsManagement.jsx`
- **Description:**  
  Demonstrates the skills CRUD management page featuring category filtering across 6 disciplines: Videography (Sony FX3/FX6, Lighting), Video Editing (DaVinci Resolve, Premiere Pro), Web Development (React, Modern CSS), Programming (JavaScript, Python), Database (PostgreSQL/Aiven), and Other (ACES Color Science, Git). Displays animated percentage progress bars.

---

### Screenshot 5: Services Management
- **Route:** `http://localhost:5173/admin/services`
- **Database Table:** `portfolio_service`
- **Component:** `src/pages/admin/ServicesManagement.jsx`
- **Description:**  
  Demonstrates the creative and engineering service packages offered by Jeremy, including Video Production, Wedding Videography, Event Coverage, Promotional Videos, Social Media Reels, Video Editing & Color Grading, and Full Stack Web Development, with price ranges and bulleted feature deliverables.

---

### Screenshot 6: Projects Management
- **Route:** `http://localhost:5173/admin/projects`
- **Database Table:** `portfolio_project`
- **Component:** `src/pages/admin/ProjectsManagement.jsx`
- **Description:**  
  Demonstrates the project catalog divided into **Client Work** (wedding films, corporate summit recaps, commercial reels, conservation documentaries) and **Development Projects** (Final Hands-on Exam evaluation portal, Book Finder, Student Enrollment portal, Assignments). Supports repository URLs, live demo links, cover images, and tech stack tags.

---

### Screenshot 7: Certifications Management
- **Route:** `http://localhost:5173/admin/certifications`
- **Database Table:** `portfolio_certification`
- **Component:** `src/pages/admin/CertificationsManagement.jsx`
- **Description:**  
  Demonstrates the management interface for industry credentials, including DaVinci Resolve Certified End User (Blackmagic Design), Adobe Certified Professional in Digital Video, and Meta Front-End Developer Specialization, with credential IDs and online verification URLs.

---

### Screenshot 8: Achievements Management
- **Route:** `http://localhost:5173/admin/achievements`
- **Database Table:** `portfolio_achievement`
- **Component:** `src/pages/admin/AchievementsManagement.jsx`
- **Description:**  
  Demonstrates the awards and accolades management view, tracking competitive recognition such as the Best Cinematography Award at the National Indie Film Festival, Inter-Collegiate Media Arts Showcase runner-up, and Web & Mobile Innovation Hackathon finalist honors.

---

### Screenshot 9: Contact Information Management
- **Route:** `http://localhost:5173/admin/contact-info`
- **Database Table:** `portfolio_contactinformation`
- **Component:** `src/pages/admin/ContactInfoManagement.jsx`
- **Description:**  
  Demonstrates the communication channel management interface, enabling administration of direct contacts (Email, Phone/WhatsApp, Studio Location in Metro Manila) and official social profiles (Instagram, Facebook, LinkedIn, GitHub).

---

### Bonus Screenshot: Dashboard Overview & Live Architecture
- **Route:** `http://localhost:5173/admin`
- **API Endpoint:** `/api/dashboard-stats/`
- **Component:** `src/pages/admin/DashboardOverview.jsx`
- **Description:**  
  Shows the unified command center with 9 live dynamic metric cards, cloud database connection status indicator (`Aiven Connected`), and direct navigation shortcuts.
