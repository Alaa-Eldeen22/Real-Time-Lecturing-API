const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("messages", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: "3306",
});

module.exports = sequelize;
