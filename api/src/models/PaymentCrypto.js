const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("paymentcrypto", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    hash: {
      type: DataTypes.STRING,
    },
    paymentSource: {
      type: DataTypes.STRING,
    },
    totalPrice: {
        type: DataTypes.STRING,
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
