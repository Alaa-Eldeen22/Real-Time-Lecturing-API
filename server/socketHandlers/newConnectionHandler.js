const serverStore = require("../serverStore");
const roomsUpdate = require("./updates/rooms");
const subjectsUpdate = require("./updates/subjects");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  subjectsUpdate.updateSubjects(socket, userDetails.userId);

  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id, userDetails.userId);
  }, [500]);
};

module.exports = newConnectionHandler;
