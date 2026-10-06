const db = require('../db/database');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

exports.getProjects = (req, res) => {
  const { featured } = req.query;
  let projects = db.find('projects');

  if (featured !== undefined) {
    const isFeatured = featured === 'true' || featured === '1';
    projects = projects.filter(p => Boolean(p.featured) === isFeatured);
  }

  projects.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return res.json({
    success: true,
    count: projects.length,
    data: projects
  });
};

exports.getProjectBySlug = (req, res) => {
  const { slug } = req.params;
  const project = db.findOne('projects', p => p.slug === slug || String(p.id) === slug);

  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found.' });
  }

  return res.json({
    success: true,
    data: project
  });
};

exports.createProject = (req, res) => {
  const { title, summary, description, image_url, technologies, live_url, github_url, featured, order_index } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Project title is required.' });
  }

  const slug = req.body.slug ? slugify(req.body.slug) : slugify(title);

  const techArray = Array.isArray(technologies)
    ? technologies
    : (typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()).filter(Boolean) : []);

  const newProject = db.create('projects', {
    title,
    slug,
    summary: summary || '',
    description: description || '',
    image_url: image_url || '',
    technologies: techArray,
    live_url: live_url || '',
    github_url: github_url || '',
    featured: Boolean(featured),
    order_index: Number(order_index) || 0
  });

  return res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: newProject
  });
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.technologies && !Array.isArray(updates.technologies)) {
    updates.technologies = updates.technologies.split(',').map(t => t.trim()).filter(Boolean);
  }
  if (updates.featured !== undefined) {
    updates.featured = Boolean(updates.featured);
  }
  if (updates.order_index !== undefined) {
    updates.order_index = Number(updates.order_index);
  }
  if (updates.title && !updates.slug) {
    updates.slug = slugify(updates.title);
  }

  const updated = db.update('projects', id, updates);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Project not found.' });
  }

  return res.json({
    success: true,
    message: 'Project updated successfully',
    data: updated
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  const deleted = db.delete('projects', id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Project not found.' });
  }

  return res.json({
    success: true,
    message: 'Project deleted successfully'
  });
};
