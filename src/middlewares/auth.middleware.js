const jwt = require('jsonwebtoken');

function verificarToken(req, res, next){
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json ({
                mensaje: 'Token no proporcionado'
            });
        }
        if (!authHeader.startsWith('Bearer')){
            return res.status(401).json({
            mensaje: 'Formato de token inválido'
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'clave_secreta_provisional_123');
        req.usuario = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
        mensaje: 'Token inválido o expirado',
        error: error.message
        });
    }
}
function verificarRol(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
        return res.status(401).json({
            mensaje: 'Usuario no autenticado'
        });
        }

    if (!rolesPermitidos.includes(req.usuario.rol)){
        return res.status(403).json({
            mensaje: 'No tienes permisos para acceder a este recurso'
        });
    }

    next();
    };
}

module.exports = {
    verificarToken,
    verificarRol
};