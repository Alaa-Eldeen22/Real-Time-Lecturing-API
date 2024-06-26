const express = require("express");
const multer = require("multer");
const {
  sendMessage,
  loadMessages,
} = require("../controllers/chat/chatController");

const router = express.Router();
const upload = multer();

// Define routes for chat operations
router.post("/send-message", upload.single("file"), (req, res) => {
  const data = {
    message: req.body.message,
    file: req.file,
  };
  sendMessage(req.socket, req.io, data);
  res.status(200).send("Message sent");
});

module.exports = router;
