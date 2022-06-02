const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("paymentbook", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.TEXT,
        defaultValue:'https://www.libreriacollino.com.ar/static/media/default-book.1d8c3114.png'
    },
    price:{
        type:DataTypes.INTEGER,
    },
    total:{
        type:DataTypes.INTEGER,
    },
    cant:{
        type:DataTypes.INTEGER,
    },
  });
};
