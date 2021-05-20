const { Router } = require('express');
const router = Router();

const { createUsuariosProyecto, updateUsuarioProyecto } = require('../controllers/usuariosProyectoController');

const router = express.Router();

//SEGUN LA RUTA SE LLAMA DETERMINADO QUERY

router.post('/users-projects/create', createUsuariosProyecto);
router.post('/users-projects/update', updateUsuarioProyecto);

export default router;