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

module.exports = { createRole };