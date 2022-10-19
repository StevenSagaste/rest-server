const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/generar-jwt');


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

module.exports = {
    login
}