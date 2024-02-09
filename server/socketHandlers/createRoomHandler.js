const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const createRoomHandler = (socket) => {
  // const subjectId = { data };
  const socketId = socket.id;
  const userId = socket.user.userId;
  // console.log(`subject ID: ${subjectId}`);
  const roomDetails = serverStore.addNewActiveRoom(userId, socketId);

  socket.emit("create-room", {
    roomDetails,
  });

  roomsUpdates.updateRooms();
};

module.exports = createRoomHandler;
