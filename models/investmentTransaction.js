const mongoose = require('mongoose');

const investmentTransactionSchema = new mongoose.Schema({
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true,  // Make sure it's required
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // Make sure it's required
  },
  amount: {
    type: Number,
    required: true,  // Make sure it's required
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Withdrawn'],
    default: 'Active',
  },
}, { timestamps: true });

const InvestmentTransaction = mongoose.model('InvestmentTransaction', investmentTransactionSchema);

module.exports = InvestmentTransaction;
