const {
    DataTypes
} = require('sequelize');

//? users tendra una relacion con roles y roles tendra una relacion con users

module.exports = (sequelize) => {
    sequelize.define('users', {
        //? idUser con uuid para que sea unico y no se repita
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
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Date: {
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
        // idRole: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
    });
}

