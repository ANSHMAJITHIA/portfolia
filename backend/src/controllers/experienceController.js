const db = require('../db/database');

exports.getExperiences = (req, res) => {
  const { type } = req.query;
  let items = db.find('experiences');

  if (type) {
    items = items.filter(e => e.type.toLowerCase() === type.toLowerCase());
  }

  items.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return res.json({
    success: true,
    count: items.length,
    data: items
  });
};

exports.createExperience = (req, res) => {
  const { type, title, organization, location, start_date, end_date, is_current, description, order_index } = req.body;

  if (!title || !organization) {
    return res.status(400).json({ success: false, message: 'Title and organization are required.' });
  }

  const newExp = db.create('experiences', {
    type: type || 'work',
    title,
    organization,
    location: location || '',
    start_date: start_date || '',
    end_date: is_current ? 'Present' : (end_date || ''),
    is_current: Boolean(is_current),
    description: description || '',
    order_index: Number(order_index) || 0
  });

  return res.status(201).json({
    success: true,
    message: 'Experience entry created successfully',
    data: newExp
  });
};

exports.updateExperience = (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.is_current !== undefined) updates.is_current = Boolean(updates.is_current);
  if (updates.order_index !== undefined) updates.order_index = Number(updates.order_index);

  const updated = db.update('experiences', id, updates);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Experience entry not found.' });
  }

  return res.json({
    success: true,
    message: 'Experience entry updated successfully',
    data: updated
  });
};

exports.deleteExperience = (req, res) => {
  const { id } = req.params;
  const deleted = db.delete('experiences', id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Experience entry not found.' });
  }

  return res.json({
    success: true,
    message: 'Experience entry deleted successfully'
  });
};
