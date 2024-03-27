const multer = require("multer");

const storage = multer.memoryStorage({
  destination(req, file, callback) {
    callback(null, "");
  },
});
const multipleUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 },
}).any();

module.exports = multipleUpload;
