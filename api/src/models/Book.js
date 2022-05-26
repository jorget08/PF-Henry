const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('book', {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4
  },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
    },
    score:{
      type: DataTypes.INTEGER,
    },
    stock:{
      type: DataTypes.INTEGER,
      defaultValue:1
    },
    image:{
      type: DataTypes.STRING,
    },
    price:{
      type:DataTypes.STRING,
    },
  });
};
