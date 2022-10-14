const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { Promise } = require('mongoose');



const usuarioGet = async(req = request, res = response) => {
    
    const {limite = 5, desde = 0} = req.query;
    const query = {state: true};
    /*
    const usuarios = await Usuario.find(query)
        .skip(desde)
        .limit(Number(limite))
    ;
    const total = await Usuario.countDocuments(query);
    */
    const [total, users_info] = await Promise.all([
        
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(Number(limite))
        
    ]);

    res.json({
        total,
        users_info
    });
}

const usuarioPost = async (req = request, res = response) => {
    

    const {nombre, correo, password, rol} = req.body;
    const user = new Usuario({nombre, correo, password, rol});
    
    //encriptar password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    //guardar db
    await user.save();
    
    res.status(201).json({
        user_info: {
            user
        }
    });
}

const usuarioPut = async (req, res = response) => {
    
    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;
    

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuarioDelete = async(req, res = response) => {
    
    const {id} = req.params;
    //borrar fisicamente
    //const usuario = await Usuario.findOneAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {state: false});

    res.json(usuario);
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
