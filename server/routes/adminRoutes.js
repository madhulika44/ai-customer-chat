const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });




// Replace old FAQ with a new one
router.post('/upload-faq', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'FAQ content is required.' });
    }

    await Faq.deleteMany(); // Replace any existing FAQ
    const newFaq = new Faq({ content });
    await newFaq.save();

    res.json({ message: 'FAQ uploaded successfully.' });
  } catch (err) {
    console.error('❌ Error uploading FAQ:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/upload-faq-file', upload.single('faqFile'), async (req, res) => {
  try {

    console.log("🔁 Received file upload request"); // 👈 Add this
    console.log("📁 Uploaded file info:", req.file); // 👈 Add this
    const filePath = req.file.path;
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log("📝 File content length:", content.length);  // add this 

    await Faq.deleteMany(); // Replace existing FAQ
    const newFaq = new Faq({ content });
    await newFaq.save();
    console.log("✅ FAQ saved to DB"); // add this 

    fs.unlinkSync(filePath); // Cleanup uploaded file
     console.log("🧹 Temp file deleted");
    res.json({ message: 'FAQ uploaded and saved successfully.' });
  } catch (err) {
    console.error('❌ File upload error:', err);
    res.status(500).json({ error: 'Server error during file upload' });
  }
});

module.exports = router;
