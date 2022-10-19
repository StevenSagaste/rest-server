const { Router, response } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',[
    check('correo', 'correo needed').isEmail(),
    check('password', 'password needed').not().isEmpty(),
    validarCampos
], login);


module.exports = router;