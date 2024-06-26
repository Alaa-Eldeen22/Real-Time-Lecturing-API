const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  console.log("Upload file controller hit");

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send(`File uploaded: ${req.file.filename}`);
};

module.exports = {
  upload,
  uploadFile,
};
