const moment = require('moment');

const Query = require('../db/query');

const { errorMessage, status, successMessage } = require('../helpers/status');

const { isEmpty } = require('../helpers/validations');



/**
 * @description: Crea un nuevo proyecto
 * @param: nombre, descripcion, id plan elegido
 */
const createProyecto = async (req, res) => {

  console.log(req.body);
  const {
    nombre, descripcion, id_plan
  } = req.body;

  if (isEmpty(nombre) || isEmpty(id_plan.toString())) {
    console.log(nombre, descripcion, id_plan);
    errorMessage.error = 'Nombre y el plan no pueden estar vacios';
    return res.status(status.bad).send(errorMessage);
  }

  const created_on = moment(new Date());

  const createProyectoQuery = `INSERT INTO
      proyectos(nombre, descripcion, id_plan, fecha_creacion, archivado, activo)
      VALUES($1, $2, $3, $4, false, true)
      returning *`;

  const values = [
    nombre,
    descripcion,
    id_plan,
    created_on
  ];

  try {
    //Se intenta hacer el query
    const { rows } = await Query.query(createProyectoQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;

    //Retorna respuesta de query
    return res.status(status.created).send(successMessage);
  } catch (error) {

    //Retorna mensaje de error
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

/**
 * @description: Actualiza un proyecto. Sirve tanto para los campos que el usuario cambie como
 * para archivar y eliminar logicamente
 * @param: id proyecto, nombre, descripcion, id plan elegido, si esta archivado, si esta activo
 */
const updateProyecto = async (req, res) => {

  console.log(req.body);
  const {
    id_proyecto, nombre, descripcion, id_plan, archivado, activo
  } = req.body;

  if (isEmpty(nombre)) {
    console.log(nombre, descripcion, id_plan);
    errorMessage.error = 'Nombre y el plan no pueden estar vacios';
    return res.status(status.bad).send(errorMessage);
  }

  const updateProyectoQuery = `UPDATE proyectos
	    SET nombre=$2, descripcion=$3, id_plan=$4, archivado=$5, activo=$6
	    WHERE id_proyecto=$1
      returning *`;

  const values = [
    id_proyecto,
    nombre,
    descripcion,
    id_plan,
    archivado,
    activo
  ];

  try {
    //Se hace el query
    const { rows } = await Query.query(updateProyectoQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {

    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

/**
 * @description: Busca todos los proyectos activos en los que participa el usuario con su 
 * numero de miembros
 * @param: id del usuario
 */
const getProyectosUsuario = async (req, res) => {
  
    const id_usuario = req.params.user;

    const searchQuery = `SELECT p.id_proyecto, p.nombre, p.descripcion, p.id_plan, p.archivado, data.miembros FROM proyectos p
        INNER JOIN usuarios_proyecto up ON p.id_proyecto = up.id_proyecto
        INNER JOIN (SELECT id_proyecto id, count(id_proyecto) miembros FROM usuarios_proyecto
        group by id_proyecto) data ON data.id = up.id_proyecto
        WHERE up.id_usuario = $1 AND up.activo = true AND p.activo = true
        ORDER BY p.fecha_creacion DESC`;

    const values = [
      id_usuario
    ]

    try {
      console.log(values)

      //Realiza el query
      const { rows } = await Query.query(searchQuery, values);
      console.log(rows)
      const dbResponse = rows;
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    }
    catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  };

//Buscar todos los proyectos.
const getAllProyectos = async (req, res) => {
    console.log(req.body)
    const searchQuery = 'SELECT * from proyectos';
    try {
      const { rows } = await Query.query(searchQuery);
      console.log(rows)
      const dbResponse = rows;
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    }
    catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  };

module.exports = {
  getAllProyectos,
  getProyectosUsuario,
  updateProyecto,
  createProyecto
}