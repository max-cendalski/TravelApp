const path = require('path');
const multer = require('multer');
const imagesDirectory = path.join(__dirname, 'public/images');

/* const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}); */

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, imagesDirectory);
  },
  filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({
  storage

}).single('image');

module.exports = uploadsMiddleware;
