const express = require('express');
const router = express.Router();
const Company = require('../models/company');

// Route to create company
router.post('/', async (req, res) => {
  const { name, website, location, industry, stage, idealInvestorRole, amountRaised, minimumInvestment } = req.body;
  try {
    const company = new Company({ name, website, location, industry, stage, idealInvestorRole, amountRaised, minimumInvestment });
    await company.save();
    res.status(201).json({ message: 'Company created!', company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating company' });
  }
});

module.exports = router;
