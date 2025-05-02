const express = require('express');
const router = express.Router();
const TeamMember = require('../models/teamMember');

// Route to create team member
router.post('/', async (req, res) => {
  const { projectId, name, linkedin, position, bio, photo } = req.body;
  try {
    const teamMember = new TeamMember({ project: projectId, name, linkedin, position, bio, photo });
    await teamMember.save();
    res.status(201).json({ message: 'Team member added!', teamMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding team member' });
  }
});

module.exports = router;
