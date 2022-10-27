const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { uploadFile, subirImagen, mostrarImagen, subirImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();


router.post('/', validarArchivoSubir ,uploadFile );

router.put('/:coll/:id', [
    validarArchivoSubir,
    check('id', 'invalid ID').isMongoId(),
    check('coll').custom(c => coleccionesPermitidas( c , ['usuarios', 'productos'])),
    validarCampos
], subirImagenCloudinary)
// ], subirImagen)

router.get('/:coll/:id', [
    check('id', 'invalid ID').isMongoId(),
    check('coll').custom(c => coleccionesPermitidas( c , ['usuarios', 'productos'])),
    validarCampos, 
], mostrarImagen )




module.exports = router;