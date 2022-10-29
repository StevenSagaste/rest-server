const { Router, response } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, renovarToken } = require('../controllers/auth.controller');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

router.post('/login',[
    check('correo', 'correo needed').isEmail(),
    check('password', 'password needed').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'id_token needed').not().isEmpty(),
    validarCampos
], googleSignIn);

router.get('/', validarJWT, renovarToken);


module.exports = router;