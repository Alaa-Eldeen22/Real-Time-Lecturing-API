const serverStore = require("../../serverStore");
const User = require("../../models/user");

const updateRooms = async (toSpecifiedSocketId = null, studentId) => {
  // const studentId = socket.user.userId;
  console.log("studentID: ", studentId);
  const io = serverStore.getSocketServerInstance();
  const user = await User.findById(studentId, {
    _id: 1,
    subjects: 1,
  }).populate("subjects", "_id code name");
  let subjectsList = [];

  if (user) {
    subjectsList = user.subjects.map((subj) => {
      return {
        id: subj._id,
      };
    });
    subjectsList = subjectsList.map((item) => item.id.toString());
    console.log("subjectList: ", subjectsList);
    const activeRooms = serverStore.getActiveRoomBySubjectId(subjectsList);
    console.log("acitveRooms, ", activeRooms);
    if (toSpecifiedSocketId) {
      io.to(toSpecifiedSocketId).emit("active-rooms", {
        activeRooms,
      });
    } else {
      io.emit("active-rooms", {
        activeRooms,
      });
    }
  }
};

module.exports = {
  updateRooms,
};
