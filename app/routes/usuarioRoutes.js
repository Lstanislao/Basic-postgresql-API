const { Router } = require('express');
const router = Router();
const { createUsuario, loginUsuario } = require('../controllers/usuariosController')

//usuario
router.post('/users/signup', createUsuario);
router.post('/users/login', loginUsuario);

module.exports = router;