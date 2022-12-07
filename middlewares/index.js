
const validarCampos = require('../middlewares/validar-campos');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarArchivo,
}