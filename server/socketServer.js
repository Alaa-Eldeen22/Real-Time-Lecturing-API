const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const createRoomHandler = require("./socketHandlers/createRoomHandler");
const joinRoomHandler = require("./socketHandlers/joinRoomHandler");
const leaveRoomHandler = require("./socketHandlers/leaveRoomHandler");
const initializeConnectionHandler = require("./socketHandlers/initializeConnectionHandler");
const signalingDataHandler = require("./socketHandlers/signalingDataHandler");
const serverStore = require("./serverStore");
const postEnroll = require("./controllers/subject/postEnroll");
const create = require("./controllers/subject/createSubjects");
const Message = require("./models/message");

// const UPDATE_INTERVAL = 7 * 1000;

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

  io.on("connection", (socket) => {
    // console.log(socket);
    console.log("user connected");
    // create();
    // console.log(socket.id);

    newConnectionHandler(socket, io);
    // emitOnlineUsers();

    socket.on("create-room", (data) => {
      console.log("room came", data);
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

    socket.on("send-message", async (data) => {
      try {
        const newMessage = await Message.create({
          id: data.id,
          username: data.username,
          message: data.message,
          timestamp: data.timestamp,
        });
        io.emit("receive-message", data);
        console.log("Message stored in ");
      } catch (error) {
        console.error("Error saving message to the database:", error);
      }
    });

    socket.on("message", (data) => {
      console.log(data);
      io.emit("chat-message", data);
    });

    Message.findAll({ order: [["timestamp", "ASC"]] })
      .then((messages) => {
        socket.emit("load-messages", messages);
      })
      .catch((err) => console.log(err));

    socket.on("disconnect", () => {
      console.log("user disonnected");
      disconnectHandler(socket);
    });
  });

  // setInterval(() => {
  //   emitOnlineUsers();
  // }, UPDATE_INTERVAL);
};

module.exports = {
  registerSocketServer,
};
