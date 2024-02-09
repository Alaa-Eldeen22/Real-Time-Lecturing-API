const serverStore = require("../serverStore");
const friendsUpdate = require("../socketHandlers/updates/friends");
const roomsUpdate = require("./updates/rooms");
const subjectsUpdate = require("./updates/subjects");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending friends invitations list
  friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  // console.log("handler");
  // friendsUpdate.updateFriends(socket, userDetails.userId);
  subjectsUpdate.updateSubjects(socket, userDetails.userId);
  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id);
  }, [500]);
};

module.exports = newConnectionHandler;
