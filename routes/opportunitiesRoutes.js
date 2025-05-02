// routes/opportunitiesRoutes.js

const express = require('express');
const router = express.Router();
const Opportunity = require('../models/opportunity');
const authMiddleware = require('../middleware/authMiddleware');

// POST /opportunities — create a new investment opportunity
router.post('/', authMiddleware, async (req, res) => {
    const {
        companyName,
        projectTitle,
        website,
        companyBased,
        industry,
        stage,
        idealInvestorRole,
        amountRaised,
        minimumInvestment,
        shortSummary,
        businessDescription,
        progressFile,
        objectives,
        teamOverview,
        teamMembers,
        logo,
        projectImages,
        video,
        documents
    } = req.body;

    try {
        const newOpportunity = new Opportunity({
            companyName,
            projectTitle,
            website,
            companyBased,
            industry,
            stage,
            idealInvestorRole,
            amountRaised,
            minimumInvestment,
            shortSummary,
            businessDescription,
            progressFile,
            objectives,
            teamOverview,
            teamMembers,
            logo,
            projectImages,
            video,
            documents,
            creator: req.user.id
        });

        await newOpportunity.save();
        res.status(201).json({ message: 'Opportunity created!', opportunity: newOpportunity });
    } catch (err) {
        console.error('Error creating opportunity:', err.message);
        res.status(500).json({ error: 'Error creating opportunity', details: err.message });
    }
});

// GET /opportunities — list all opportunities (optional)
router.get('/', async (req, res) => {
    try {
        const opportunities = await Opportunity.find();
        res.json(opportunities);
    } catch (err) {
        console.error('Error fetching opportunities:', err.message);
        res.status(500).json({ error: 'Error fetching opportunities', details: err.message });
    }
});

// —— New Route: GET /opportunities/mine ——
// Returns only the opportunities created by the logged-in user
router.get('/mine', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      const myProjects = await Opportunity.find({ creator: userId })
        .sort({ createdAt: -1 });    // newest first, optional
  
      res.json(myProjects);
    } catch (err) {
      console.error('Error fetching my projects:', err);
      res.status(500).json({ error: 'Error fetching your projects' });
    }
  });
  
module.exports = router;
