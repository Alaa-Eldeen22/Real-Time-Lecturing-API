const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");
const Subject = require("../models/subject");

const createRoomHandler = async (socket, data) => {
  const subjectId = data;
  const socketId = socket.id;
  const studentId = socket.user.userId;
  const roomDetails = serverStore.addNewActiveRoom(
    studentId,
    socketId,
    subjectId
  );

  // const studentsList = await Subject.findById(subjectId, { students: 1 })
  //   .students;
  console.log("roomDetails: ", roomDetails);
  const studentsList = (await Subject.findById(subjectId, { students: 1 }))
    .students;

  // console.log(studentsList);
  // console.log("\n");
  let studentIdsList = studentsList.map((student) => student.toString());
  // console.log(studentIdsList);
  const onlineStudents = await serverStore.getOnlineStudents(studentIdsList);
  console.log("onlineStudents: ", onlineStudents);
  // studentIdsList = studentsList.map((studentId) => studentId.toString());

  // console.log(onlineStudents);
  socket.emit("create-room", {
    roomDetails,
  });
  const activeRooms = serverStore.getActiveRooms();

  const io = serverStore.getSocketServerInstance();
  onlineStudents.forEach((socketId) => {
    io.to(socketId).emit("active-rooms", {
      activeRooms,
    });
  });

  // roomsUpdates.updateRooms();
};

module.exports = createRoomHandler;
