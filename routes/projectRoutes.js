const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Route to create project
router.post('/', async (req, res) => {
  const { companyId, title, shortSummary, description, progressFiles, objectives, futureUpdates } = req.body;
  try {
    const project = new Project({ company: companyId, title, shortSummary, description, progressFiles, objectives, futureUpdates });
    await project.save();
    res.status(201).json({ message: 'Project created!', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

module.exports = router;
