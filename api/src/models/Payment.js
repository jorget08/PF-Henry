const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("payment", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    orderID: {
      type: DataTypes.STRING,
    },
    payerID: {
      type: DataTypes.STRING,
    },
    paymentSource: {
      type: DataTypes.STRING,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.TEXT,
    },
    deliveryStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
  });
};
