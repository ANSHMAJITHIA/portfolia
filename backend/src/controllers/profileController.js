const db = require('../db/database');

exports.getProfile = (req, res) => {
  const profile = db.getProfile();
  return res.json({
    success: true,
    data: profile
  });
};

exports.updateProfile = (req, res) => {
  const updates = req.body;
  delete updates.id; // Prevent overwriting id

  const updatedProfile = db.updateProfile(updates);
  return res.json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedProfile
  });
};
