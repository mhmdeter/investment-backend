const express = require('express');
const router = express.Router();
const Document = require('../models/document');

// Route to upload documents
router.post('/', async (req, res) => {
  const { projectId, documents } = req.body;
  try {
    const document = new Document({ project: projectId, documents });
    await document.save();
    res.status(201).json({ message: 'Documents uploaded!', document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading documents' });
  }
});

module.exports = router;
