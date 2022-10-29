const jwt = require('jsonwebtoken');

const {Usuario} = require('../models');
// const usuario = new Usuario();

const generateJWT = (uid = '') => {
    return new Promise((resolve,reject) => {
        const payload = {uid};
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '4h'
            },
            (err, token)=>{
                if(err){
                    console.log(err);
                    reject('token cant generate')
                }else{
                    resolve(token);
                }
            }
        );
    });
}

const comprobarJWT = async( token = '' ) => {

    // console.log(token);

    try {
        
        if (token.length < 10 ) {
            console.log(token);
            return null;
        }

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById( uid );

        if (usuario && usuario.state) {
            return usuario
        } else {
            console.log(usuario , usuario.state);
            return null;
        }

    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports = {
    generateJWT,
    comprobarJWT,
}