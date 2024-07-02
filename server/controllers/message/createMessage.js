const postCreate = require("./postCreate");

const createMessage = () => {
  postCreate({
    username: "alaa",
    message: "message from alaa",
    subjectId: "OS chat",
  });
};
module.exports = createMessage;
