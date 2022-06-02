//? create role
const { Rol } = require("../db");

const createRole = async (req, res) => {
    const { name, description } = req.body;
    try {
        const role = await Rol.create({
            name,
            description
        });
        res.json({
            ok: true,
            role
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el rol'
        });
    }
};
const getRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        res.json({
            ok: true,
            roles
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los roles'
        });
    }
}

module.exports = { createRole, getRoles };