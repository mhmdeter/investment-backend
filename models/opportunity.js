const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,
  linkedin: String,
  position: String,
  bio: String,
  photo: String, // This will be a URL or file path
});

const opportunitySchema = new mongoose.Schema({
  // Page 1 - Company Info
  companyName: { type: String, required: true },
  projectTitle: { type: String, required: true },
  website: { type: String },
  companyBased: { type: String, required: true },
  industry: { type: String, enum: ['Technology', 'Healthcare', 'Retail', 'Finance', 'Education'], required: true },
  stage: { type: String, required: true },
  idealInvestorRole: { type: String, required: true },
  amountRaised: { type: Number, required: true },
  minimumInvestment: { type: Number, required: true },

  // Page 2 - Post & Deal
  shortSummary: { type: String, required: true },
  businessDescription: { type: String, required: true },
  progressFile: { type: String }, // File path or URL
  objectives: { type: String, required: true },

  // Page 3 - Team
  teamOverview: { type: String },
  teamMembers: [teamMemberSchema],

  // Page 4 - Media
  logo: { type: String, required: true },
  projectImages: [String],
  video: { type: String },

  // Page 5 - Documents
  documents: [String],

  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
