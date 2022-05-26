const { Users, Roles } = require("../db");

const validarAdminRole = async (req, res, next) => {
    const uid = req.uid;
    try {
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
                msg: 'Usuario no existe, verifica el email'
            });
        }
        if (user.role.name !== 'admin') {
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }
}
//? validar admin role o mi usuario
const validarAdminOmio = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
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
                msg: 'Usuario no existe, verifica el email'
            });
        }
        if (user.role.name !== 'admin' && user.idUser !== id) {
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }
}

module.exports = { validarAdminRole, validarAdminOmio };