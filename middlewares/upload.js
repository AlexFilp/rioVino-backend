const multer = require("multer");
const path = require("path");
const { HttpError } = require("../utils");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const filename = `riovino-${file.originalname}`;
    cb(null, filename);
  },
});

// const limits = {
//   fileSize: 5 * 1024 * 1024,
// };

// const fileFilter = (req, file, cb) => {
//   const acceptedMimeTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "image/webp",
//   ];

//   if (acceptedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new HttpError(400, "Unsupported file type"), false);
//   }
// };

const upload = multer({ storage: multerConfig });

module.exports = upload;
