const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    idUser: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Date:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    imgProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favoritos: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
    },
  });
};

