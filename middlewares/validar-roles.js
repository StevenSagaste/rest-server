const { response } = require("express");

const isAdminRole = ( req , res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'try to validate role before token'
        });
    }
    
    const { rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `User: ${nombre} is not an Administrator`
        });
    }

    next();
}

const demandRole = (...roles)=>{

    return (req, res = response, next) => {

        
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'server was tried to validate role before token'
            });
        }
        
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `service needs some of the next roles: ${roles}`
            });
        }

        console.log(roles, req.usuario.rol);
        next();
    }

}

module.exports = {
    isAdminRole, demandRole
}