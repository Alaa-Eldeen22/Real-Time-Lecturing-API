const Message = require("../../models/message");

const postCreate = async ({ username, message, subjectId }) => {
  try {
    return await Message.create({
      username: username,
      message: message,
      subjectId: subjectId,
    });
    // console.log("Message created", newMessage);
  } catch (err) {
    console.log(err);
  }
};

module.exports = postCreate;
