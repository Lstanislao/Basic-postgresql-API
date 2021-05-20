const { Router } = require('express');
const router = Router();

const { 
  createProyecto, 
  getAllProyectos, 
  getProyectosUsuario, 
  updateProyecto 
  } = require('../controllers/proyectosController');


//SEGUN LA RUTA SE LLAMA DETERMINADO QUERY

router.post('/projects/create', createProyecto);
router.post('/projects/update', updateProyecto);
router.get('/projects/:user', getProyectosUsuario);
router.get('/all-projects', getAllProyectos);

module.exports = router;