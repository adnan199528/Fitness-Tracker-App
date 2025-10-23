// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = 'uploads/';
//     // Ensure the directory exists
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

//cloudinary 
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

module.exports = upload;