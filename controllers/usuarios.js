const { request, response } = require('express');

const usuarioGet = (req = request, res = response) => {
    
    const {q,nombre,api_key} = req.query;
    
    res.json({
        msg:'get ',
        q,
        nombre,
        api_key
    });
}

const usuarioPost = (req, res = response) => {
    
    const {nombre , edad} = req.body;
    
    res.status(201).json({
        msg:'post ',
        user_info: {
            nombre,
            edad
        }
    });
}

const usuarioPut = (req, res = response) => {
    
    const {id} = req.params;
    
    res.json({
        msg:'put ',
        id
    });
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg:'delete '
    });
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg:'patch '
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
}