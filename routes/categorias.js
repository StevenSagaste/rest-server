const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/index');

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

// Crear categoria
router.post('/', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria );

// Borrar una categoria - Admin
router.delete('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],borrarCategoria);


module.exports = router;