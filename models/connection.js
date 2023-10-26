const Sequelize = require("sequelize");
const { createTable } = require("./user.model");
require("dotenv").config();

const sequelize = new Sequelize("loginauth", "root", "root", {
   host: process.env.HOST,
   port: process.env.PORT,
   dialect: process.env.DIALECT,
});

const User = createTable(sequelize);

module.exports = { sequelize, User };
