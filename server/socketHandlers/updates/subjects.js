const User = require("../../models/user");
const updateSubjects = async (socket, userId) => {
  try {
    const data = await User.findById(userId, {
      subjects: 1,
    }).populate("subjects", "_id code name");
    const subjects = data.subjects.map(({ code, name }) => ({ code, name }));

    if (subjects.length) {
      socket.emit("subjects-list", subjects);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateSubjects,
};
