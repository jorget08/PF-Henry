const bcrypt = require('bcrypt');
const { Users, Roles } = require("../db");
const { validationResult } = require('express-validator');
const { generateJwt } = require('../helpers/generateJwt');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //? no enviar password ni updateAt ni createAt
        const user = await Users.findOne({
            where: { email },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Roles,
                attributes: ['name']
            }
        });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe, verifica el email'
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        const token = await generateJwt(user.idUser);
        //? no enviar password 
        user.password = undefined;
        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }
}
const renewToken = async (req, res) => {
    const uid = req.uid;
    try {
        //? buscar usuario por id
        const user = await Users.findOne({
            where: { idUser: uid },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Roles,
                attributes: ['name']
            }
        });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        const token = await generateJwt(user.idUser);
        //? no enviar password
        user.password = undefined;
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al renovar token'
        });    
    }

}

module.exports = { login, renewToken };