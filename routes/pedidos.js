const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, isAdminRole } = require('../middlewares');

const { crearPedido } = require('../controllers/pedidos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico


// Obtener una categoria por id - publico
// router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos,
// ], obtenerProducto );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    // validarJWT,
    check('cliente','El nombre del cliente es obligatorio').not().isEmpty(),
    check('cantidad','Se necesita una cantidad').not().isEmpty(),
    check('producto').custom( existeProductoPorId ),
    validarCampos
], crearPedido );

// Actualizar - privado - cualquiera con token válido
// router.put('/:id',[
//     validarJWT,
//     // check('id','No es un id de Mongo').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos
// ], actualizarProducto );

// Borrar una categoria - Admin
// router.delete('/:id',[
//     // validarJWT,
//     // isAdminRole,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos,
// ], borrarProducto);


module.exports = router;