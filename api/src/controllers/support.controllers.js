const { User, Rol, Support } = require("../db");

//? support comments 
const createSupport = async (req, res) => {
    const { name, email, comment } = req.body;
    try {
        const userExist = await User.findOne({ where: { email } });
        if (!userExist) {
            const support = await Support.create({
                isUser: false,
                email,
                name,
                comment,
                date: new Date(),
                status: 0
            });
            return res.status(200).json({
                ok: true,
                msg: 'Support created',
                support
            });1
        }
        const support = await Support.create({
            isUser: true,
            email: userExist.email,
            name: userExist.name,
            comment,
            date: new Date(),
            status: 0
        });
        const supportWithUser = await Support.findOne({
            where: { idSupport: support.idSupport },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        });
        res.json({
            ok: true,
            supportWithUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
//? respuesta del support
const responseSupport = async (req, res) => {
    const uid = req.uid;
    const { idSupport, response } = req.body;
    try {
        const userExist = await User.findOne({ where: { idUser: uid } });
        if (!userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist'
            });
        }
        const support = await Support.findOne({
            where: { idSupport }
        });
        if (!support) {
            return res.status(400).json({
                ok: false,
                msg: 'Support does not exist'
            });
        }
        await support.update({
            idAdmin: uid,
            dateResponse: new Date(),
            status: 1,
            response
        });
        //? get admin name
        const admin = await User.findOne({
            where: { idUser: uid },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        //? get support with user
        const supportWithUser = await Support.findOne({
            where: { idSupport },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        });
        //? add admin name to support
        const supportWithAdmin = {
            ...supportWithUser.dataValues,
            admin: admin.name
        }
        res.json({
            ok: true,
            supportWithAdmin
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const getSupports = async (req, res) => {
                                                //const uid = req.uid;
    try {
        //? traer usuario con su rol
        // const userExist = await User.findOne({ 
        //     where: { idUser: uid },
        //     attributes: { exclude: ['createdAt', 'updatedAt'] },
        //     include: {
        //         model: Rol,
        //         attributes: ['name']
        //     },
        //     raw: true,
        //     nest: true 
        // });
        // if (!userExist) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'User does not exist'
        //     });
        // }
        //? si es admin mostrar todos los comentarios
        // if (userExist.rols.name === 'admin') 
        {
            const supports = await Support.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: User,
                    attributes: ['name', 'email']
                }
            });
            if (!supports) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No supports'
                });
            }
            res.json({
                ok: true,
                supports
            });
        }
        //? si es user mostrar solo los de su id
        // else{
        //     const supports = await Support.findAll({
        //         attributes: { exclude: ['createdAt', 'updatedAt'] },
        //         where: { userIdUser : uid },
        //         include: {
        //             model: User,
        //             attributes: ['name', 'email']
        //         }
        //     });
        //     if (!supports) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'No supports'
        //         });
        //     }
        //     res.json({
        //         ok: true,
        //         supports
        //     });
        // }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const getSupportById = async (req, res) => {
    
}
//? si quiere editar su comentario  
const updateSupport = async (req, res) => {
    const uid = req.uid;
    const idSupport = req.params.id;
    //? si ya se respondio no se puede editar 
    const { comment } = req.body;
    try {
        const userExist = await User.findOne({ where: { idUser: uid } });
        if (!userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist'
            });
        }
        const support = await Support.findOne({
            where: { idSupport }
        });
        if (!support) {
            return res.status(400).json({
                ok: false,
                msg: 'Support does not exist'
            });
        }
        if (support.status === 1) {
            return res.status(400).json({
                ok: false,
                msg: 'Support already answered'
            });
        }
        await support.update({
            comment
        });
        //? get support with user
        const supportWithUser = await Support.findOne({
            where: { idSupport },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        });
        res.json({
            ok: true,
            supportWithUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const deleteSupport = async (req, res) => {
    const uid = req.uid;
    const { idSupport } = req.body;
    try {
        const userExist = await User.findOne({ where: { idUser: uid } });
        if (!userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist'
            });
        }
        const support = await Support.findOne({
            where: { idSupport }
        });
        if (!support) {
            return res.status(400).json({
                ok: false,
                msg: 'Support does not exist'
            });
        }
        await support.destroy();
        res.json({
            ok: true,
            msg: 'Support deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = { createSupport, getSupports, updateSupport, deleteSupport, responseSupport, getSupportById };