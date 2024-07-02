const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");
const Subject = require("../models/subject");

const createRoomHandler = async (socket, data) => {
  const { subjectId } = data;
  const socketId = socket.id;
  const studentId = socket.user.userId;

  const roomDetails = serverStore.addNewActiveRoom(
    studentId,
    socketId,
    subjectId
  );


  const studentsList = (await Subject.findById(subjectId, { students: 1 }))
    .students;

  let studentIdsList = studentsList.map((student) => student.toString());

  const onlineStudentsSocketIds = await serverStore.getOnlineStudents(studentIdsList);

  socket.emit("create-room", {
    roomDetails,
  });
  const activeRooms = serverStore.getActiveRooms();

  const io = serverStore.getSocketServerInstance();
  onlineStudentsSocketIds.forEach((socketId) => {
    io.to(socketId).emit("active-rooms", {
      activeRooms,
    });
  });

  // roomsUpdates.updateRooms();
};

module.exports = createRoomHandler;
