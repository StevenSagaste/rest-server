const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next)=>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'send token is require'
        })
    }
    
    console.log(token);

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'invalid token - inexistent user'
            });   
        }
        
        //const { status } = usuario;

        if (!usuario.state) {
            return res.status(401).json({
                msg: 'invalid token - user_state: false',
            });   
        }

        req.usuario = usuario;
        next();
        
    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'invalid token'
        })
    }
}

module.exports = {
    validarJWT
}