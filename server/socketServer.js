const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const createRoomHandler = require("./socketHandlers/createRoomHandler");
const joinRoomHandler = require("./socketHandlers/joinRoomHandler");
const leaveRoomHandler = require("./socketHandlers/leaveRoomHandler");
const initializeConnectionHandler = require("./socketHandlers/initializeConnectionHandler");
const signalingDataHandler = require("./socketHandlers/signalingDataHandler");
const newMessageHandler = require("./socketHandlers/newMessageHandler");
const serverStore = require("./serverStore");
const loadMessagesHandler = require("./socketHandlers/loadMessagesHandler");
const postEnroll = require("./controllers/subject/postEnroll");
// const create = require("./controllers/subject/createSubjects");
// const createMessage = require("./controllers/message/createMessage");
// const UPDATE_INTERVAL = 7 * 1000;

const registerSocketServer = (server) => {
  // postEnroll({
  //   studentId: "65c67c6909b77feebdcffaae",
  //   subjectId: "65c2d050253cb9939c30c03a",
  // });

  // console.log("register socket server");
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

  io.on("connection", (socket) => {
    // console.log(socket);
    console.log("user connected");
    // create();
    // createMessage();
    // console.log(socket.id);

    newConnectionHandler(socket, io);

    socket.on("create-room", (data) => {
      // console.log("room came", data);
      createRoomHandler(socket, data);
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

    socket.on("send-message", (data) => {
      // console.log("message came :\n", data);
      newMessageHandler(data, socket.id);
    });

    socket.on("load-messages", (data) => {
      console.log("load message");
      console.log(data);
      loadMessagesHandler(socket, data);
    });

    socket.on("disconnect", () => {
      console.log("user disonnected");
      disconnectHandler(socket);
    });
  });
};

module.exports = {
  registerSocketServer,
};
