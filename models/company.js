const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String },
  location: { type: String, required: true },
  industry: { type: String, enum: ['technology', 'healthcare', 'retail', 'finance', 'education'], required: true },
  stage: { type: String, required: true },
  idealInvestorRole: { type: String, required: true },
  amountRaised: { type: Number, required: true },
  minimumInvestment: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
