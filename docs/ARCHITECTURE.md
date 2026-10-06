# Portfolio System — Architecture Documentation

## 1. System Overview

This system is an end-to-end, production-grade personal portfolio platform featuring a decoupled architecture:
1. **Public Frontend Client**: Built with React and Tailwind CSS, delivering a fast, responsive, SEO-ready user experience with rich micro-animations.
2. **Backend Application & REST API**: Built with Node.js and Express.js, providing robust data persistence, validation, rate limiting, and asset storage.
3. **Custom-Coded Content Management System (CMS)**: An administrative dashboard built from scratch without external headless CMS platforms (e.g. Strapi, Sanity, Contentful). It gives the portfolio owner full control over profile data, skills, projects, work experience, blog posts, and contact inquiries.

```
+-------------------------------------------------------------+
|                     Client Layer                            |
|  +-----------------------------+  +----------------------+  |
|  | Public Portfolio UI (React) |  | Custom CMS Admin SPA |  |
|  +--------------+--------------+  +----------+-----------+  |
+-----------------|----------------------------|--------------+
                  | REST API                   | REST API + JWT
                  v                            v
+-------------------------------------------------------------+
|                     Server Layer                            |
|             Express.js Application (Port 5000)              |
|  +-------------------------------------------------------+  |
|  | Middlewares: CORS | Helmet | Morgan | JWT Auth        |  |
|  +-------------------------------------------------------+  |
|  | Controllers: Profile | Skills | Projects | Blog | etc.|  |
|  +-------------------------------------------------------+  |
|  | File Upload Service (Multer) -> /uploads              |  |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     Data Layer                              |
|           SQLite Database (portfolio.sqlite)                |
|  (Tables: users, profile, skills, projects, exp, blog, msg) |
+-------------------------------------------------------------+
```

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | React 18+, Vite, Tailwind CSS, Lucide Icons | Blazing fast build times, utility-first responsive styling, accessible vector iconography, single-page reactive performance. |
| **Backend** | Node.js (v18+ / v22+), Express.js | Lightweight, non-blocking I/O, industry standard for REST APIs, easily containerized. |
| **Custom CMS** | Built-in Single Page Application + Express static hosting | Zero external CMS lock-in, immediate updates, unified deployment. |
| **Database** | SQLite (Embedded SQL) / Extensible to PostgreSQL/MongoDB | Zero-configuration needed for local and lightweight deployment, ACID-compliant, easily migratable. |
| **Authentication**| JSON Web Tokens (JWT) + Bcrypt password hashing | Stateless authentication with signed tokens for all CMS administrative routes. |
| **File Storage** | Multer local storage engine (`/uploads` static endpoint) | Clean image uploads for project covers, avatar, and blog featured images. |

---

## 3. Data Schema & Models

### 3.1 `users` (Admin Authentication)
- `id` (INTEGER, PRIMARY KEY)
- `username` (VARCHAR(50), UNIQUE)
- `email` (VARCHAR(100), UNIQUE)
- `password_hash` (TEXT)
- `created_at` (DATETIME)

### 3.2 `profile` (Personal Bio & Contact Links)
- `id` (INTEGER, PRIMARY KEY)
- `full_name` (VARCHAR(100))
- `headline` (VARCHAR(200))
- `bio` (TEXT)
- `avatar_url` (TEXT)
- `resume_url` (TEXT)
- `location` (VARCHAR(100))
- `email` (VARCHAR(100))
- `github_url` (VARCHAR(200))
- `linkedin_url` (VARCHAR(200))
- `twitter_url` (VARCHAR(200))
- `updated_at` (DATETIME)

### 3.3 `skills` (Technical Competencies)
- `id` (INTEGER, PRIMARY KEY)
- `name` (VARCHAR(50))
- `category` (VARCHAR(50): `Frontend`, `Backend`, `Database`, `DevOps`, `Tools`)
- `proficiency` (INTEGER: 0-100)
- `icon` (VARCHAR(50))
- `order_index` (INTEGER)

### 3.4 `projects` (Showcase Portfolio Items)
- `id` (INTEGER, PRIMARY KEY)
- `title` (VARCHAR(100))
- `slug` (VARCHAR(100), UNIQUE)
- `summary` (TEXT)
- `description` (TEXT)
- `image_url` (TEXT)
- `technologies` (TEXT, JSON-serialized array)
- `live_url` (TEXT)
- `github_url` (TEXT)
- `featured` (BOOLEAN: 0 or 1)
- `order_index` (INTEGER)
- `created_at` (DATETIME)

### 3.5 `experiences` (Work & Education Timeline)
- `id` (INTEGER, PRIMARY KEY)
- `type` (VARCHAR(20): `work` or `education`)
- `title` (VARCHAR(100))
- `organization` (VARCHAR(100))
- `location` (VARCHAR(100))
- `start_date` (VARCHAR(50))
- `end_date` (VARCHAR(50))
- `is_current` (BOOLEAN: 0 or 1)
- `description` (TEXT)
- `order_index` (INTEGER)

### 3.6 `blog_posts` (Articles & Insights)
- `id` (INTEGER, PRIMARY KEY)
- `title` (VARCHAR(200))
- `slug` (VARCHAR(200), UNIQUE)
- `excerpt` (TEXT)
- `content` (TEXT, Markdown supported)
- `cover_image` (TEXT)
- `tags` (TEXT, JSON-serialized array)
- `status` (VARCHAR(20): `published` or `draft`)
- `published_at` (DATETIME)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### 3.7 `messages` (Contact Form Inquiries)
- `id` (INTEGER, PRIMARY KEY)
- `name` (VARCHAR(100))
- `email` (VARCHAR(100))
- `subject` (VARCHAR(200))
- `message` (TEXT)
- `is_read` (BOOLEAN: 0 or 1)
- `created_at` (DATETIME)

---

## 4. Security & Best Practices

1. **Password Security**: Passwords are never stored in plaintext. They are hashed using `bcryptjs` with salt rounds = 10.
2. **Stateless JWT Authorization**: Admin requests require `Authorization: Bearer <token>` in headers. Token expiration is configured to 24 hours.
3. **CORS (Cross-Origin Resource Sharing)**: Configured to allow requests from the React frontend port while protecting against arbitrary origins in production.
4. **Input Sanitization & Validation**: Validation on all CRUD and contact submissions to reject malicious payloads and empty entries.
5. **Static File Guarding**: Uploads directory accepts specified image MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/gif`) with random file naming to prevent directory traversal attacks.
