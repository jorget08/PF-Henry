const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('book', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
    },
    score:{
      type: DataTypes.INTEGER,
    },
    stock:{
      type: DataTypes.INTEGER,
    },
    image:{
      type: DataTypes.STRING,
    },
  });
};

