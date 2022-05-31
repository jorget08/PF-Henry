const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('roles', {
        //? idRole con uuid para que sea unico y no se repita
        idRole: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
}