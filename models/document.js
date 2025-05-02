const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  documents: [{ type: String }] // URLs to uploaded documents
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
