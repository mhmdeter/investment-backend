// routes/dashboardRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const InvestmentTransaction = require('../models/investmentTransaction');
const Opportunity = require('../models/opportunity');

// GET /dashboard
router.get('/', authMiddleware, async (req, res) => {
  // req.user.id is a string; Mongoose will cast it, but you can also do:
  const userId = req.user.id;

  try {
    // 1) Total Invested
    const investedAgg = await InvestmentTransaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalInvested = investedAgg[0]?.total || 0;

    // 2) Projects Posted
    const projectsPosted = await Opportunity.countDocuments({ creator: userId });

    // 3) Active Investments
    const activeInvestments = await InvestmentTransaction.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
      status: 'Active'
    });

    // 4) Profit Earned
    const profitAgg = await InvestmentTransaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$profit' } } }
    ]);
    const profitEarned = profitAgg[0]?.total || 0;

    res.json({ totalInvested, projectsPosted, activeInvestments, profitEarned });
  } catch (err) {
    console.error('Error getting dashboard data:', err);
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
});

module.exports = router;
