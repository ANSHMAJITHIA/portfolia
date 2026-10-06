# Portfolio & Custom CMS — 2-Week Implementation Plan

A structured 14-day roadmap to build, test, and launch the custom-coded portfolio ecosystem from scratch.

---

## 📅 Week 1: Backend Architecture, Custom CMS & Data Layer

### Day 1: Project Setup & System Design
- **Objectives**: Initialize repositories, establish architectural boundaries, configure environment configs.
- **Tasks**:
  - Set up directory structures (`frontend/`, `backend/`, `docs/`).
  - Configure `.env.example`, `.gitignore`, and package manifests.
  - Define schema definitions for profile, skills, projects, experience, blog, and messages.
- **Deliverables**: Initialized workspace, validated environment variables.

### Day 2: Database Initialization & Seeding Engine
- **Objectives**: Create persistent database tables and seed with comprehensive default data.
- **Tasks**:
  - Implement SQLite database initialization module with auto-table generation.
  - Write seed script to populate Ansh Majithia's portfolio content (skills, experience, sample projects, articles).
  - Test data consistency and relations.
- **Deliverables**: Operational database file (`portfolio.sqlite`) with pre-seeded data.

### Day 3: Authentication & Security Middleware
- **Objectives**: Secure admin operations using JWT and password hashing.
- **Tasks**:
  - Implement `bcryptjs` password hashing utilities.
  - Build `POST /api/v1/auth/login` and `GET /api/v1/auth/me`.
  - Create `requireAuth` JWT validation middleware.
  - Set up security headers via `helmet` and configure `cors` policies.
- **Deliverables**: Protected authentication subsystem and token generator.

### Day 4: Core Public REST API Endpoints
- **Objectives**: Develop read endpoints consumed by the public portfolio frontend.
- **Tasks**:
  - Profile controller & routes (`GET /api/v1/profile`).
  - Skills controller & routes (`GET /api/v1/skills`).
  - Projects controller & routes (`GET /api/v1/projects`, `GET /api/v1/projects/:slug`).
  - Experience controller & routes (`GET /api/v1/experiences`).
  - Blog reader controller & routes (`GET /api/v1/blog`, `GET /api/v1/blog/:slug`).
- **Deliverables**: Public REST endpoints ready for client integration.

### Day 5: Contact System & Media Upload Service
- **Objectives**: Enable user inquiries and asset storage.
- **Tasks**:
  - Implement `POST /api/v1/contact` with payload validation.
  - Implement `multer` storage engine with image filtering and upload routes (`/api/v1/admin/upload`).
  - Serve static uploaded assets via `/uploads`.
  - Build message inbox retrieval and read/delete endpoints.
- **Deliverables**: Functional media upload pipeline and contact message queue.

### Day 6: Custom CMS Admin Panel — Core Layout & Auth
- **Objectives**: Build the custom admin dashboard user interface without any third-party CMS dependencies.
- **Tasks**:
  - Develop SPA Admin Dashboard served at `/admin`.
  - Build modern login screen with token persistence in `localStorage`.
  - Create responsive sidebar, header, and active tab routing (Profile, Skills, Projects, Experience, Blog, Messages).
- **Deliverables**: Navigable CMS Admin Dashboard with login flow.

### Day 7: Custom CMS Admin Panel — Full CRUD Capabilities
- **Objectives**: Finalize full management capabilities inside the CMS.
- **Tasks**:
  - Implement interactive form for Profile & Bio updates.
  - Implement Skills add/edit/delete modal.
  - Implement Projects manager with image upload and live preview.
  - Implement Markdown-supported Blog Post editor with draft/published state toggle.
  - Implement Contact Inbox viewer with badge counter.
- **Deliverables**: 100% operational custom CMS admin panel.

---

## 📅 Week 2: Frontend Client, Polish & Production Launch

### Day 8: Frontend Foundation & Design System
- **Objectives**: Scaffold React frontend with Tailwind CSS and responsive design tokens.
- **Tasks**:
  - Initialize React application using Vite.
  - Configure Tailwind CSS color palettes (slate, indigo, violet, dark/light themes).
  - Create shared layout components: `Navbar` with smooth scrolling and `Footer`.
  - Establish `api.js` client with graceful fallback data.
- **Deliverables**: Responsive layout shell with theme controls.

### Day 9: Hero, About, and Interactive Skills Section
- **Objectives**: Build top-of-funnel personal presentation components.
- **Tasks**:
  - Build `HeroSection` with dynamic typing effect, CTA buttons, and status indicator.
  - Build `AboutSection` displaying biography, profile highlights, and quick stats.
  - Build `SkillsSection` with categorized tabs (Frontend, Backend, Database, DevOps) and proficiency meters.
- **Deliverables**: Polished top portfolio sections connected to backend API.

### Day 10: Projects Showcase & Interactive Modal
- **Objectives**: Showcase work with rich filtering and detailed modal views.
- **Tasks**:
  - Build `ProjectsSection` with category filtering and "Featured" badges.
  - Implement `ProjectCard` with interactive hover cards, GitHub links, and live demo buttons.
  - Build `ProjectModal` for expanded project view with detailed bullet points and tech stack tags.
- **Deliverables**: Dynamic project showcase.

### Day 11: Experience Timeline & Blog Reader
- **Objectives**: Present career trajectory and technical writing.
- **Tasks**:
  - Build vertical timeline for work experience and education.
  - Build `BlogSection` previewing recent published articles.
  - Implement single-post article reader with markdown rendering and read-time estimation.
- **Deliverables**: Career timeline and functioning blog.

### Day 12: Contact Form Integration & Client-Side Validation
- **Objectives**: Allow visitors to send direct messages to the CMS inbox.
- **Tasks**:
  - Build `ContactSection` with form fields: Name, Email, Subject, Message.
  - Implement real-time client validation and submission state (loading spinner, success message, error alert).
  - Connect submission to `POST /api/v1/contact`.
- **Deliverables**: Live working contact form saving to backend database.

### Day 13: End-to-End Integration, SEO & Performance
- **Objectives**: Unify both systems, audit responsiveness, and optimize performance.
- **Tasks**:
  - Verify seamless communication between Frontend (`:5173`) and Backend (`:5000`).
  - Add SEO meta tags, OpenGraph previews, and favicon.
  - Audit performance with Lighthouse (accessibility, SEO, best practices).
  - Verify custom CMS edits instantly reflect on the public frontend upon reload.
- **Deliverables**: High-performance, production-ready portfolio.

### Day 14: Deployment Checklist & Handover
- **Objectives**: Deploy both services and deliver comprehensive maintenance runbook.
- **Tasks**:
  - Backend deployment guide (Railway, Render, VPS, or Docker).
  - Frontend deployment guide (Vercel, Netlify, or static server).
  - Final end-to-end smoke testing.
  - Deliver administrator credentials and maintenance documentation.
- **Deliverables**: Live production deployment & complete handover documentation.
