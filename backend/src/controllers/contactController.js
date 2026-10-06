const db = require('../db/database');

// Public form submission
exports.submitContactMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required fields.'
    });
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const newMessage = db.create('messages', {
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'New Contact Request').trim(),
    message: message.trim(),
    is_read: false
  });

  return res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! Your message has been received.',
    data: { id: newMessage.id }
  });
};

// Admin: Get all inquiries
exports.getMessages = (req, res) => {
  const messages = db.find('messages');
  messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const unreadCount = messages.filter(m => !m.is_read).length;

  return res.json({
    success: true,
    count: messages.length,
    unreadCount,
    data: messages
  });
};

// Admin: Mark message read/unread
exports.toggleMessageRead = (req, res) => {
  const { id } = req.params;
  const message = db.findById('messages', id);

  if (!message) {
    return res.status(404).json({ success: false, message: 'Message not found.' });
  }

  const updated = db.update('messages', id, { is_read: !message.is_read });
  return res.json({
    success: true,
    data: updated
  });
};

// Admin: Delete message
exports.deleteMessage = (req, res) => {
  const { id } = req.params;
  const deleted = db.delete('messages', id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Message not found.' });
  }

  return res.json({
    success: true,
    message: 'Message deleted successfully.'
  });
};
