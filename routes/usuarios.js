const { Router, response } = require('express');
const { check } = require('express-validator');

const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPatch } = require('../controllers/usuarios');
const { rolValidator, mailValidator, userIdValidator } = require('../helpers/db-validators');

const {
  validarCampos,
  validarJWT,
  isAdminRole,
  demandRole
} = require('../middlewares')

const router = Router();

router.get('/', usuarioGet);

router.post('/', [
  check('nombre', 'Nombre obligatorio').not().isEmpty(),
  check('password', 'password min 6 caracteres').isLength({min:6}),
  check('correo', 'correo invalido').isEmail(),
  check('correo').custom(mailValidator),
  //check('rol', 'rol invalido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(rolValidator),

  validarCampos
], usuarioPost);

router.put('/:id',[
  check('id', 'invalid id').isMongoId(),
  check('id').custom(userIdValidator),
  check('rol').custom(rolValidator),
  validarCampos
], usuarioPut);

router.delete('/:id',[
  validarJWT,
  //isAdminRole,
  demandRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'invalid id').isMongoId(),
  check('id').custom(userIdValidator),
  validarCampos
], usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;