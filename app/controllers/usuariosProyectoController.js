const moment = require('moment');

const Query = require('../db/query');

const { errorMessage, status, successMessage } = require('../helpers/status');

const { isEmpty } = require('../helpers/validations');

/**
 * @description: Crea un la relacion entre un usuario y un proyecto con su rol en el
 * @param: rol, id del usuario, id del proyecto
 */
const createUsuariosProyecto = async (req, res) => {

  console.log(req.body);
  const {
    rol, id_usuario, id_proyecto
  } = req.body;

  if (isEmpty(rol.toString()) || isEmpty(id_usuario.toString()) || isEmpty(id_proyecto.toString())) {
    errorMessage.error = 'Rol y IDs no pueden estar vacios';
    return res.status(status.bad).send(errorMessage);
  }

  //const created_on = moment(new Date());

  const createUsuarioProyectoQuery = `INSERT INTO
      usuarios_proyecto(rol, id_usuario, id_proyecto, activo)
      VALUES($1, $2, $3, true)
      returning *`;

  const values = [
    rol,
    id_usuario,
    id_proyecto
  ];

  try {
    //Se realiza el query
    const { rows } = await Query.query(createUsuarioProyectoQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {

    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}

/**
 * @description: Actualizar informacion de relacion de usuario y proyecto.
 * Sirve para hacer eliminacionlogica o recuperacion en caso de eliminar o agregar nuevamente a un usuario como colaborador
 * @param: id del usuario, id del proyecto, id plan elegido
 */
 const updateUsuarioProyecto = async (req, res) => {

  console.log(req.body);
  const {
    id_usuario, id_proyecto, activo
  } = req.body;

  const updateUsuarioProyectoQuery = `UPDATE usuarios_proyecto
	    SET activo=$3
	    WHERE id_usuario=$1 AND id_proyecto=$2
      returning *`;

  const values = [
    id_usuario,
    id_proyecto,
    activo
  ];

  try {
    //Se realiza el query
    const { rows } = await Query.query(updateUsuarioProyectoQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {

    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
}


module.exports = {
  createUsuariosProyecto,
  updateUsuarioProyecto
}
