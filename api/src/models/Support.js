const { DataTypes } = require('sequelize');
//? consultas a admin
module.exports = (sequelize) => {
    sequelize.define('support', {
        idSupport: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        emailGuess: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //? idAdmin es el id del admin que responde al support 
        idAdmin: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        //? date response es la fecha en la que el admin responde al support
        dateResponse: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        //? status: 0 = pendiente, 1 = respondido por admin, 2 = respondido por user 
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        response: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

}