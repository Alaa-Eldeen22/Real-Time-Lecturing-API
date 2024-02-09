const User = require("../../models/user");
const updateSubjects = async (socket, userId) => {
  try {
    const user = await User.findById(userId, {
      _id: 1,
      subjects: 1,
    }).populate("subjects", "_id code name");
    if (user) {
      const subjectsList = user.subjects.map((subj) => {
        return {
          id: subj._id,
          code: subj.code,
          name: subj.name,
        };
      });
      // console.log(subjectsList);
      socket.emit("subjects-list", {
        subjects: subjectsList ? subjectsList : [],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateSubjects,
};
