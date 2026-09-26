const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Save file with original name, but append timestamp to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Only accept PDF, DOC, DOCX
    const allowedExts = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// API endpoint for receiving applications
app.post('/api/apply', upload.single('resume'), (req, res) => {
  try {
    const { role, fullName, email, phone, portfolio } = req.body;
    const resumeFile = req.file;

    if (!fullName || !email || !resumeFile) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('--- New Application Received ---');
    console.log(`Role: ${role}`);
    console.log(`Name: ${fullName}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Portfolio: ${portfolio}`);
    console.log(`Resume Saved To: ${resumeFile.path}`);
    console.log('--------------------------------');

    // Here you would typically connect to a database to save the application
    // or use a service like Nodemailer to send an email to the admin.

    res.status(200).json({ 
      message: 'Application received successfully',
      applicationId: Date.now()
    });

  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ message: 'Internal server error processing your application' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Scalora Schools Backend running on http://localhost:${PORT}`);
});
