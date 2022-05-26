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
      type: DataTypes.STRING(10000),
    },
    score:{
      type: DataTypes.STRING,
    },
    // stock:{
    //   type: DataTypes.INTEGER,
    // },
    image:{
      type: DataTypes.STRING,
    },
    price:{
      type:DataTypes.STRING,
    }
  });
};

