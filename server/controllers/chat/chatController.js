const message = require("../../models/message");
const fs = require("fs");
const path = require("path");

const sendMessage = (socket, io, data) => {
  console.log(data);
  message
    .create(data)
    .then((savedMessage) => {
      io.emit("receive-message", savedMessage);
    })
    .catch((error) => {
      console.error("Error saving message:", error);
    });
};

const loadMessages = (socket) => {
  message
    .findAll({ order: [["timestamp", "ASC"]] })
    .then((messages) => {
      socket.emit("load-messages", messages);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  sendMessage,
  loadMessages,
};
