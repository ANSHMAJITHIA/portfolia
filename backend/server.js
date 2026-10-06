require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev flexibility, can be tightened to CLIENT_URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static asset folders
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Custom CMS Admin Static Panel
const adminPath = path.join(__dirname, 'public', 'admin');
app.use('/admin', express.static(adminPath));

// API Routes mounted on both /api/v1 and /api for compatibility
app.use('/api/v1', apiRoutes);
app.use('/api', apiRoutes);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'portfolio-backend-cms',
    timestamp: new Date().toISOString()
  });
});

// Root route: 안내 and redirect to /admin
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.url}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Internal Error]', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Portfolio REST API Server running on port ${PORT}`);
  console.log(`📡 API Base URL:       http://localhost:${PORT}/api/v1`);
  console.log(`🛠️ Custom CMS Panel:   http://localhost:${PORT}/admin`);
  console.log(`📁 Uploads Directory:  http://localhost:${PORT}/uploads`);
  console.log(`====================================================`);
});
