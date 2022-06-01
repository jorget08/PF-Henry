const jwt = require("jsonwebtoken");

const validarJwt = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.uid = user.id;
        next();
    } 
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }

}
//? export
module.exports = { validarJwt };