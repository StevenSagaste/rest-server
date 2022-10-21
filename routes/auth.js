const { Router, response } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',[
    check('correo', 'correo needed').isEmail(),
    check('password', 'password needed').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'id_token needed').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;