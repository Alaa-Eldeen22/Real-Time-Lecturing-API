const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const createRoomHandler = (socket) => {
  console.log("handling room create event");
  const socketId = socket.id;
  const userId = socket.user.userId;

  const roomDetails = serverStore.addNewActiveRoom(userId, socketId);

  socket.emit("create-room", {
    roomDetails,
  });

  roomsUpdates.updateRooms();
};

module.exports = createRoomHandler;
