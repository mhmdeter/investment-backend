const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  shortSummary: { type: String, required: true },
  description: { type: String, required: true },
  progressFiles: [{ type: String }], // store URLs for uploaded progress files
  objectives: { type: String, required: true },
  futureUpdates: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
