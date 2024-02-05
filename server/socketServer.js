const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const createRoomHandler = require("./socketHandlers/createRoomHandler");
const joinRoomHandler = require("./socketHandlers/joinRoomHandler");
const leaveRoomHandler = require("./socketHandlers/leaveRoomHandler");
const initializeConnectionHandler = require("./socketHandlers/initializeConnectionHandler");
const signalingDataHandler = require("./socketHandlers/signalingDataHandler");
const serverStore = require("./serverStore");

const UPDATE_INTERVAL = 7 * 1000;

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);

    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("create-room", () => {
      createRoomHandler(socket);
    });

    socket.on("join-room", (data) => {
      joinRoomHandler(socket, data);
    });

    socket.on("leave-room", (data) => {
      leaveRoomHandler(socket, data);
    });

    socket.on("initialze-connection", (data) => {
      initializeConnectionHandler(socket, data);
    });

    socket.on("conn-signal", (data) => {
      signalingDataHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, UPDATE_INTERVAL);
};

module.exports = {
  registerSocketServer,
};
