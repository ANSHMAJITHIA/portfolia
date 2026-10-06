# Portfolio REST API Documentation

Base URL: `http://localhost:5000/api/v1`

All responses follow a consistent JSON format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional status message"
}
```

---

## 1. Authentication Endpoints

### 1.1 Admin Login
- **URL**: `POST /auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "your_secure_password"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@portfolio.dev"
    }
  }
  ```

### 1.2 Verify Current Session
- **URL**: `GET /auth/me`
- **Access**: Protected (`Bearer <token>`)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@portfolio.dev"
    }
  }
  ```

---

## 2. Public Client Endpoints

### 2.1 Get Profile Information
- **URL**: `GET /profile`
- **Access**: Public
- **Response (200 OK)**: Returns full name, bio, social links, resume link, location.

### 2.2 Get Skills
- **URL**: `GET /skills`
- **Access**: Public
- **Query Params**: `?category=Frontend` (optional)
- **Response (200 OK)**: Returns array of skills ordered by `order_index`.

### 2.3 Get Projects
- **URL**: `GET /projects`
- **Access**: Public
- **Query Params**: `?featured=true` (optional)
- **Response (200 OK)**: Returns list of portfolio projects with parsed tech arrays.

### 2.4 Get Single Project by Slug
- **URL**: `GET /projects/:slug`
- **Access**: Public
- **Response (200 OK)**: Returns single project detailed information.

### 2.5 Get Experiences & Education
- **URL**: `GET /experiences`
- **Access**: Public
- **Query Params**: `?type=work` or `?type=education` (optional)
- **Response (200 OK)**: Returns chronological timeline items.

### 2.6 Get Blog Posts
- **URL**: `GET /blog`
- **Access**: Public (only returns `status = 'published'`)
- **Query Params**: `?tag=React` (optional)
- **Response (200 OK)**: Array of published blog posts.

### 2.7 Get Blog Post by Slug
- **URL**: `GET /blog/:slug`
- **Access**: Public
- **Response (200 OK)**: Full article body with markdown content.

### 2.8 Submit Contact Message
- **URL**: `POST /contact`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Freelance Project Inquiry",
    "message": "Hi Ansh, I'd like to discuss a project with you..."
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Your message has been received! I will reply shortly."
  }
  ```

---

## 3. Protected CMS Admin Endpoints (Requires `Authorization: Bearer <token>`)

### 3.1 Media Upload
- **URL**: `POST /admin/upload`
- **Access**: Protected
- **Body**: `multipart/form-data` with field `file`
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "fileUrl": "/uploads/image-17123456789.png"
  }
  ```

### 3.2 Update Profile
- **URL**: `PUT /admin/profile`
- **Access**: Protected
- **Body**: Partial or full fields of profile.

### 3.3 Manage Skills
- `POST /admin/skills` (Create skill)
- `PUT /admin/skills/:id` (Update skill)
- `DELETE /admin/skills/:id` (Delete skill)

### 3.4 Manage Projects
- `POST /admin/projects` (Create project)
- `PUT /admin/projects/:id` (Update project)
- `DELETE /admin/projects/:id` (Delete project)

### 3.5 Manage Experiences
- `POST /admin/experiences` (Create entry)
- `PUT /admin/experiences/:id` (Update entry)
- `DELETE /admin/experiences/:id` (Delete entry)

### 3.6 Manage Blog Posts
- `GET /admin/blog` (Get all posts including drafts)
- `POST /admin/blog` (Create post)
- `PUT /admin/blog/:id` (Update post)
- `DELETE /admin/blog/:id` (Delete post)

### 3.7 Contact Inbox Management
- `GET /admin/messages` (List all inquiries)
- `PATCH /admin/messages/:id/read` (Toggle read status)
- `DELETE /admin/messages/:id` (Delete inquiry)
