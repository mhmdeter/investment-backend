const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const InvestmentTransaction = require('../models/investmentTransaction');
const Opportunity = require('../models/opportunity');


router.post('/', async (req, res) => {
  const { amount, opportunityId, userId, status } = req.body;

  // 1) Make sure all required fields are present
  if (amount == null || !opportunityId || !userId || !status) {
    return res
      .status(400)
      .json({ error: 'All fields required: amount, opportunityId, userId, status.' });
  }

  // 2) Validate opportunityId format
  if (!mongoose.Types.ObjectId.isValid(opportunityId)) {
    return res.status(400).json({ error: 'Invalid opportunityId format.' });
  }

  // 3) Check that the opportunity exists
  let opp;
  try {
    opp = await Opportunity.findById(opportunityId);
  } catch (e) {
    return res.status(500).json({ error: 'Database error when looking up opportunity.' });
  }
  if (!opp) {
    return res.status(404).json({ error: 'Investment opportunity not found.' });
  }

  // 4) Create and save the transaction
  try {
    const tx = new InvestmentTransaction({
      amount,
      opportunityId,
      userId,
      status,
    });
    await tx.save();
    return res.status(201).json({ message: 'Investment transaction created!', transaction: tx });
  } catch (err) {
    console.error('Error saving transaction:', err);
    return res.status(500).json({ error: 'Error creating investment transaction.' });
  }
});

// —— New Route: GET /investments/mine ——
// Fetch all investment transactions of the logged-in user
router.get('/mine', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
  
      const investments = await InvestmentTransaction.find({ userId })
        .populate('opportunityId', 'projectTitle companyName logo') // populate useful info
        .sort({ createdAt: -1 });
  
      res.json(investments);
    } catch (err) {
      console.error('Error fetching user investments:', err);
      res.status(500).json({ error: 'Failed to fetch investments' });
    }
  });

module.exports = router;
