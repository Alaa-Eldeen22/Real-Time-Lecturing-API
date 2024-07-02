const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();
let activeRooms = [];
let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

// rooms
const addNewActiveRoom = (userId, socketId, subjectId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
    subjectId,
  };

  activeRooms = [...activeRooms, newActiveRoom];

  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRooms];
};

const getActiveRoom = (roomId) => {
  const activeRoom = activeRooms.find(
    (activeRoom) => activeRoom.roomId === roomId
  );

  if (activeRoom) {
    return {
      ...activeRoom,
    };
  } else {
    return null;
  }
};

const getActiveRoomBySubjectId = (subjectsList) => {
  const acitveRooms = [];
  activeRooms.forEach((room) => {
    // console.log("roomID: ", room.subjectId);
    subjectsList.forEach((subj) => {
      // console.log("subj: ", subj);
      if (room.subjectId === subj) {
        acitveRooms.push(room);
      }
    });
  });
  return acitveRooms;
};
// const findCommonSocketIds = (studentIds, connectedUsers) => {
//   const commonSocketIds = [];

//   for (const [socketId, userInfo] of connectedUsers) {
//     const { studentId } = userInfo;
//     if (studentIds.includes(studentId)) {
//       commonSocketIds.push(socketId);
//     }
//   }

//   return commonSocketIds;
// };

const getOnlineStudents = (studentIds) => {
  const onlineStudents = [];

  for (const [socketId, userInfo] of connectedUsers) {
    const { userId } = userInfo;
    if (studentIds.includes(userId)) {
      onlineStudents.push(socketId);
    }
  }

  return onlineStudents;
};
const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);
  // console.log("room has been found");

  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
  // console.log(activeRooms);

  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };

  activeRooms.push(updatedRoom);
};

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);

  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };

    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );

    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
  getOnlineStudents,
  getActiveRoomBySubjectId,
};
