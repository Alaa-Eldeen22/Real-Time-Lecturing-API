const jwt = require("jsonwebtoken");

const config = process.env;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  // console.log(`token ${token}`);
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decoded;
    // console.log(`decoded ${decoded}`);
    // console.log("decoded ", socket.user);
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
