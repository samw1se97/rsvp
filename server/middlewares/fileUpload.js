const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // Get the file extension
    const fileExt = path.extname(file.originalname);

    // Generate unique filename
    const uniqueFilename =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + fileExt;

    cb(null, uniqueFilename);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    console.log(file.originalname.split('.'));
    const fileFormat = file.originalname.split('.')[1];
    console.log(fileFormat);

    req.fileValidationError = 'Only image files are allowed!';
    return cb(null, false);
  }
  cb(null, true);
};

// Create multer upload middleware with file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
}).array('guest-imgs', 25);

module.exports = upload;
