const { Router, response } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, isAdminRole } = require('../middlewares/index');

const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria, 
    borrarCategoria } = require('../controllers/controller.categorias');
    
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//  Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],borrarCategoria);


module.exports = router;