const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  logo: { type: String, required: true }, // URL to logo
  projectImages: [{ type: String }], // URLs to project images
  video: { type: String } // URL to the project video
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema);
