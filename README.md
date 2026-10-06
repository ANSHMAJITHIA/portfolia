# Portfolio Project — Full-Stack Ecosystem & Custom CMS

A modern, production-grade personal portfolio built with a decoupled architecture:
- ⚛️ **Frontend**: React 18 + Tailwind CSS + Lucide Icons + Vite
- 🛠️ **Backend**: Node.js + Express.js REST API + SQLite persistence
- 🎛️ **Custom CMS**: Bespoke single-page admin panel (no third-party headless CMS dependencies)
- 📚 **Full Documentation**: System Architecture, REST API Reference, and 14-Day Implementation Roadmap

---

## 🏗️ Architecture Overview

```
                        +----------------------------+
                        |   Public Client (React)    |
                        |    http://localhost:5173   |
                        +--------------+-------------+
                                       |
                                       | Public REST Calls
                                       v
+----------------------------+  +----------------------------+
|   Custom CMS Admin SPA     |->|  Express API (:5000)       |
|    http://localhost:5000   |  |  Middlewares & Auth (JWT)  |
|           /admin           |  +--------------+-------------+
+----------------------------+                 |
                                               v
                                +----------------------------+
                                |  portfolio.sqlite Storage  |
                                |  + Local /uploads Media    |
                                +----------------------------+
```

---

## 📁 Repository Structure

```
portfolio/
├── docs/
│   ├── ARCHITECTURE.md          # Full architectural & security documentation
│   ├── API_DOCUMENTATION.md     # Complete REST endpoints reference
│   └── TWO_WEEK_PLAN.md         # Exhaustive 14-day production roadmap
├── backend/                     # Node.js + Express REST API & Custom CMS
│   ├── data/                    # SQLite database store (auto-seeded)
│   ├── uploads/                 # Static media files uploaded via CMS
│   ├── public/admin/            # Custom-coded CMS Admin Panel SPA
│   │   ├── index.html           # Admin Dashboard layout & Tailwind styles
│   │   └── cms.js               # Reactive CMS client logic & API bindings
│   ├── src/
│   │   ├── controllers/         # Auth, Profile, Skills, Projects, Blog, etc.
│   │   ├── db/                  # Database persistence layer & seed models
│   │   ├── middleware/          # JWT auth & Multer file upload handlers
│   │   └── routes/api.js        # Public and protected REST routes
│   ├── server.js                # Express server bootstrapper
│   └── package.json
├── frontend/                    # React + Tailwind CSS client
│   ├── src/
│   │   ├── components/          # Navbar, Hero, About, Skills, Projects,
│   │   │                        # Modal, Experience, Blog, Contact, Footer
│   │   ├── lib/api.js           # Resilient REST API client
│   │   ├── App.jsx              # Main application coordinator
│   │   ├── index.css            # Tailwind directives & glow effects
│   │   └── main.jsx
│   ├── vite.config.js           # Vite dev server + proxy to backend
│   └── package.json
└── package.json                 # Monorepo runner scripts
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on v22.14.0)
- **npm** v9+

### 2. Start the Backend & CMS
```bash
cd backend
npm install   # Already installed
npm start
```
- **Backend API**: `http://localhost:5000/api/v1`
- **CMS Admin Studio**: `http://localhost:5000/admin`
- **Default CMS Credentials**:
  - **Username**: `admin`
  - **Password**: `admin123`

### 3. Start the Frontend
In a separate terminal:
```bash
cd frontend
npm install   # Already installed
npm run dev
```
- **Public Portfolio URL**: `http://localhost:5173`

---

## 🎛️ Custom CMS Features

1. **Personal Identity & Bio**: Edit Full Name, Headline, Biography, Avatar URL or upload directly, and social links.
2. **Skills & Tech Stack**: Add, categorize, modify proficiency sliders (0–100%), and delete skills.
3. **Project Showcase**: Upload cover images, set descriptions, tag technologies, assign live demo and GitHub repository links, and toggle "Featured" status.
4. **Experience & Education**: Timeline manager for jobs, companies, dates, current roles, and academic achievements.
5. **Blog & Editorial Studio**: Write articles with Markdown formatting, assign tags, cover photos, and toggle Draft/Published state.
6. **Contact Inbox**: Read messages submitted via the public contact form, toggle read/unread status, and clear inquiries.
7. **Media Uploads**: Built-in file uploader saving to `/uploads` with instant image preview.

---

## 📖 In-Depth Documentation Links

- 🏛️ [Architecture & Data Models](file:///c:/Users/anshm/OneDrive/Desktop/portfolio/docs/ARCHITECTURE.md)
- 🔌 [REST API Documentation](file:///c:/Users/anshm/OneDrive/Desktop/portfolio/docs/API_DOCUMENTATION.md)
- 📅 [14-Day Production Roadmap](file:///c:/Users/anshm/OneDrive/Desktop/portfolio/docs/TWO_WEEK_PLAN.md)
