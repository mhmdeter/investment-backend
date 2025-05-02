const express = require('express');
const router = express.Router();
const Media = require('../models/media');

// Route to upload media
router.post('/', async (req, res) => {
  const { projectId, logo, projectImages, video } = req.body;
  try {
    const media = new Media({ project: projectId, logo, projectImages, video });
    await media.save();
    res.status(201).json({ message: 'Media uploaded!', media });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading media' });
  }
});

module.exports = router;
