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

// Public: Only published articles
exports.getPublishedPosts = (req, res) => {
  const { tag } = req.query;
  let posts = db.find('posts', p => p.status === 'published');

  if (tag) {
    posts = posts.filter(p => Array.isArray(p.tags) && p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
  }

  posts.sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));

  return res.json({
    success: true,
    count: posts.length,
    data: posts
  });
};

exports.getPostBySlug = (req, res) => {
  const { slug } = req.params;
  const post = db.findOne('posts', p => (p.slug === slug || String(p.id) === slug) && p.status === 'published');

  if (!post) {
    return res.status(404).json({ success: false, message: 'Article not found.' });
  }

  return res.json({
    success: true,
    data: post
  });
};

// Admin: All posts (published + draft)
exports.getAllPostsAdmin = (req, res) => {
  const posts = db.find('posts');
  posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return res.json({
    success: true,
    count: posts.length,
    data: posts
  });
};

exports.createPost = (req, res) => {
  const { title, excerpt, content, cover_image, tags, status } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Post title is required.' });
  }

  const slug = req.body.slug ? slugify(req.body.slug) : slugify(title);
  const tagArray = Array.isArray(tags)
    ? tags
    : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : []);

  const postStatus = status === 'published' ? 'published' : 'draft';
  const now = new Date().toISOString();

  const newPost = db.create('posts', {
    title,
    slug,
    excerpt: excerpt || '',
    content: content || '',
    cover_image: cover_image || '',
    tags: tagArray,
    status: postStatus,
    published_at: postStatus === 'published' ? now : null,
    created_at: now,
    updated_at: now
  });

  return res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost
  });
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.tags && !Array.isArray(updates.tags)) {
    updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
  }
  if (updates.title && !updates.slug) {
    updates.slug = slugify(updates.title);
  }
  if (updates.status === 'published') {
    const existing = db.findById('posts', id);
    if (existing && !existing.published_at) {
      updates.published_at = new Date().toISOString();
    }
  }

  const updated = db.update('posts', id, updates);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  return res.json({
    success: true,
    message: 'Post updated successfully',
    data: updated
  });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  const deleted = db.delete('posts', id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  return res.json({
    success: true,
    message: 'Post deleted successfully'
  });
};
