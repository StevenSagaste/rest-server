const { Error } = require('mongoose');
const {Role, Usuario, Categoria , Producto} = require('../models');

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

const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
  	rolValidator,
	mailValidator,
	userIdValidator,
	existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}