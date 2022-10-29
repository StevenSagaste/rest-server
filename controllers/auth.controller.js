const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require("../helpers/google-verify");


const login = async(req = request, res = response) => {

    const {correo, password} = req.body;

    try {

        //verificar email
        const user = await Usuario.findOne({correo});
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario || Password incorrectos - correo'
            })
        }
        //usario state
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario || Password incorrectos - estado: false'
            })
        }
        //password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario || Password incorrectos - password'
            })
        }
        //JSON Web Token JWT
        const token = await generateJWT(user.id);


        res.json({
            user, token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'some thing was wrong || contact administrator'
        });
    }

}

const googleSignIn = async( req, res = response ) =>{

    const { id_token } = req.body;
    try {

        const {nombre, img, correo} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {

            const data = {
                nombre,
                correo,
                password: 'owo',
                img,
                google: true
            };
            
            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.state) {
            return res.status(401).json({
                msg: 'unavailable user - contact administrator'
            })
        }

        const token = await generateJWT(usuario.id);

        res.json({
            
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'verify token error'
        });
    }
}

const renovarToken = async(req, res = response) => {

    const { usuario } = req;
    const token = await generateJWT(usuario.id);

    res.json({
        usuario,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renovarToken,
}