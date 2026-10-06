const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const skillsController = require('../controllers/skillsController');
const projectsController = require('../controllers/projectsController');
const experienceController = require('../controllers/experienceController');
const blogController = require('../controllers/blogController');
const contactController = require('../controllers/contactController');

// ==========================================
// 1. PUBLIC ROUTES
// ==========================================

// Auth
router.post('/auth/login', authController.login);

// Profile
router.get('/profile', profileController.getProfile);

// Skills
router.get('/skills', skillsController.getSkills);

// Projects
router.get('/projects', projectsController.getProjects);
router.get('/projects/:slug', projectsController.getProjectBySlug);

// Experience & Education
router.get('/experiences', experienceController.getExperiences);

// Blog
router.get('/blog', blogController.getPublishedPosts);
router.get('/blog/:slug', blogController.getPostBySlug);

// Contact Inquiries
router.post('/contact', contactController.submitContactMessage);


// ==========================================
// 2. PROTECTED ADMIN CMS ROUTES
// ==========================================

// Auth session verification
router.get('/auth/me', requireAuth, authController.getMe);

// Media Upload
router.post('/admin/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  return res.status(201).json({
    success: true,
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename
  });
});

// Profile Management
router.put('/admin/profile', requireAuth, profileController.updateProfile);

// Skills Management
router.post('/admin/skills', requireAuth, skillsController.createSkill);
router.put('/admin/skills/:id', requireAuth, skillsController.updateSkill);
router.delete('/admin/skills/:id', requireAuth, skillsController.deleteSkill);

// Projects Management
router.post('/admin/projects', requireAuth, projectsController.createProject);
router.put('/admin/projects/:id', requireAuth, projectsController.updateProject);
router.delete('/admin/projects/:id', requireAuth, projectsController.deleteProject);

// Experiences Management
router.post('/admin/experiences', requireAuth, experienceController.createExperience);
router.put('/admin/experiences/:id', requireAuth, experienceController.updateExperience);
router.delete('/admin/experiences/:id', requireAuth, experienceController.deleteExperience);

// Blog Management
router.get('/admin/blog', requireAuth, blogController.getAllPostsAdmin);
router.post('/admin/blog', requireAuth, blogController.createPost);
router.put('/admin/blog/:id', requireAuth, blogController.updatePost);
router.delete('/admin/blog/:id', requireAuth, blogController.deletePost);

// Contact Messages Management
router.get('/admin/messages', requireAuth, contactController.getMessages);
router.patch('/admin/messages/:id/read', requireAuth, contactController.toggleMessageRead);
router.delete('/admin/messages/:id', requireAuth, contactController.deleteMessage);

module.exports = router;
