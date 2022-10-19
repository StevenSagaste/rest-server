const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'nombre obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'correo obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});


UsuarioSchema.methods.toJSON = function() {
    const {__v,password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);


/*
{
    nombre: 'asd',
    correo: 'algo@algo.algo',
    password: '12456768',
    img: '1343y3u3i4yuui213',
    rol: 'user'
    state: false,
    google: true,

}
*/