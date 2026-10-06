const db = require('../db/database');

exports.getSkills = (req, res) => {
  const { category } = req.query;
  let skills = db.find('skills');

  if (category) {
    skills = skills.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  // Sort by order_index
  skills.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return res.json({
    success: true,
    count: skills.length,
    data: skills
  });
};

exports.createSkill = (req, res) => {
  const { name, category, proficiency, icon, order_index } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      success: false,
      message: 'Name and category are required.'
    });
  }

  const newSkill = db.create('skills', {
    name,
    category,
    proficiency: Number(proficiency) || 80,
    icon: icon || 'code',
    order_index: Number(order_index) || 0
  });

  return res.status(201).json({
    success: true,
    message: 'Skill created successfully',
    data: newSkill
  });
};

exports.updateSkill = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.proficiency) updates.proficiency = Number(updates.proficiency);
  if (updates.order_index) updates.order_index = Number(updates.order_index);

  const updated = db.update('skills', id, updates);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Skill not found.' });
  }

  return res.json({
    success: true,
    message: 'Skill updated successfully',
    data: updated
  });
};

exports.deleteSkill = (req, res) => {
  const { id } = req.params;
  const deleted = db.delete('skills', id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Skill not found.' });
  }

  return res.json({
    success: true,
    message: 'Skill deleted successfully'
  });
};
