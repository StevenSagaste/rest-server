const { Error } = require('mongoose');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const rolValidator = async( rol = '') => {
	const rolExist = await Role.findOne({rol});
	if (!rolExist) {
		throw new Error(`El rol ${rol} no existe`)
	}
}

const mailValidator = async(correo ='') => {
	const existEmail = await Usuario.findOne({correo});
    if (existEmail) {
        throw new Error(`correo ${correo} ya esta en uso`)
    }
}

const userIdValidator = async(id) => {
	const existId = await Usuario.findById(id);
    if (!existId) {
        throw new Error(`no se encontro id: ${id}`)
    }
}

module.exports = {
  	rolValidator,
	mailValidator,
	userIdValidator
}