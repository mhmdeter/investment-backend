const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  linkedin: { type: String },
  position: { type: String, required: true },
  bio: { type: String, required: true },
  photo: { type: String } // URL to the team member's photo
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
