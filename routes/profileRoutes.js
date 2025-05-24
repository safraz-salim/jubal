const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  const { name, email, phone, location } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, location },
      { new: true, runValidators: true }
    ).select('-password');
    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed', error: err.message });
  }
});

// Upload profile picture
router.post('/upload-photo', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const base64Image = req.file.buffer.toString('base64');
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { photo: base64Image },
      { new: true }
    ).select('-password');

    res.json({ msg: 'Photo uploaded', user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
