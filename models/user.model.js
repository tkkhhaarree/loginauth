const { DataTypes } = require("sequelize");

function createTable(sequelize) {
   const User = sequelize.define("user", {
      username: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });

   return User;
}

module.exports = {
   createTable,
};
