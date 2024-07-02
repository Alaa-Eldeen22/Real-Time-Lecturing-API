const Message = require("../models/message");
const loadMessagesHandler = async (socket, subjectId) => {
  try {
    const messages = await Message.find(
      { subjectId },
      "message username subjectId timestamp"
    );
    console.log(messages);
    socket.emit("load-messages", messages);
    return messages;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = loadMessagesHandler;
