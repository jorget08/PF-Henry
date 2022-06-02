const bcrypt = require('bcrypt');
const { User, Rol } = require("../db");
const { generateJwt } = require('../helpers/generateJwt');
const { googleVerify } = require('../helpers/googleVerify');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //? no enviar password ni updateAt ni createAt
        const user = await User.findOne({
            where: { email },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Rol,
                attributes: ['name'],
            },
            raw:true, // <----- HERE
            nest:true
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
        //? destructurar todo user menos rol
    
        console.log(user.role);
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
        const user = await User.findOne({
            where: { idUser: uid },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Rol,
                attributes: ['name']
            },
            raw:true, // <----- HERE
            nest:true
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
const googleSignIn = async (req, res) => {
    const googleToken = req.body.tokenId;
    const { givenName, familyName } = req.body;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const user = await User.findOne({
            where: { email }
        });
        if (user) {
            const token = await generateJwt(user.idUser);
            //? no enviar password
            user.password = undefined;
            res.json({
                ok: true,
                user,
                token
            });
        } else {
            const roles = await Rol.findOne({ where: { name: 'user' } });
            const newUser = await User.create({
                name: givenName,
                lastName: familyName,
                email,
                password: ':)',
                imgProfile: picture,
                favoritos: []
            });
            await newUser.addRols(roles);

            const token = await generateJwt(newUser.idUser);
            //? no enviar password
            newUser.password = undefined;
            res.json({
                ok: true,
                user: newUser,
                token
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }

}

module.exports = { login, renewToken, googleSignIn };