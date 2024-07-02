const messageControllers = require("../controllers/message/messageControllers");
const serverStore = require("../serverStore");
const Subject = require("../models/subject");

const newMessageHandler = async (data, senderSocketId) => {
  const { username, message, subjectId } = data;
  const newMessage = await messageControllers.controllers.postCreate({
    username,
    message,
    subjectId,
  });
  //   console.log("senderSocketId ", senderSocketId);
  //   console.log(newMessage);
  const studentsList = (await Subject.findById(subjectId, { students: 1 }))
    .students;

  let studentIdsList = studentsList.map((student) => student.toString());

  const onlineStudentsSocketIds = await serverStore.getOnlineStudents(
    studentIdsList
  );

  const io = serverStore.getSocketServerInstance();
  for (const socketId of onlineStudentsSocketIds) {
    if (socketId === senderSocketId) {
      //   continue;
    }
    // console.log(socketId);
    io.to(socketId).emit("receive-message", newMessage);
  }
};

module.exports = newMessageHandler;
