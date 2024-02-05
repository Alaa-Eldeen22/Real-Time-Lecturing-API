const initializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;

  const initData = { connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit("initialze-connection", initData);
};

module.exports = initializeConnectionHandler;
