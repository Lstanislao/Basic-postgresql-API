const Query = require('../db/query');
const bcrypt = require('bcryptjs');
const { errorMessage, status, successMessage } = require('../helpers/status');



// const getUsers = async (req,res) => {
//   res.send('users');
//   const createUserQuery = `SELECT * FROM usuarios`;
//   try {
//     const response = await Query.query(createUserQuery)
//     console.log(response.rows);

//   } catch (error) {
    
//   }
// }

const createUsuario = async (req, res) => {
  console.log(req.body);

  const {
    nombre, apellido, contrasena, 
    fecha_nacimiento, username, email
  } = req.body;

  //TODO hashear la contrasena que no quiere leer esa funcion

  const createUsuarioQuery = `INSERT INTO
      usuarios(nombre, apellido, contrasena, fecha_nacimiento, username, email, activo)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
  
  //para validar que el username o el email ya este registrado en la tabla
  const validarEmailUsernameQuery = `
  SELECT * from usuarios WHERE username =$1 OR email =$2 `;

  const values = [
    nombre, 
    apellido, 
    contrasena, 
    fecha_nacimiento, 
    username, 
    email,
    true
  ];

  try {
    //validar que el username o el email no este en uso 
    const { rows: validation } = await Query.query(validarEmailUsernameQuery, [username, email]);
    
    if(validation.length > 0){
      const validationResponse = validation[0];
      if(validationResponse.username == username){
        errorMessage.error = 'El username ya se encuentra en uso';
        return res.status(status.notfound).send(errorMessage);

      }else if(validationResponse.email == email){
        errorMessage.error = 'El email ya se encuentra registrado';
        return res.status(status.notfound).send(errorMessage);
      }
    }

    const { rows } = await Query.query(createUsuarioQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);

  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

/**
 * @description:al hacer login, se busca correo y se verifica que la contrasena sean iguales
 * @param: email, contrasena
 */
const loginUsuario = async (req, res) => {
  console.log(req.body)
  const { email, contrasena } = req.body;

  const loginQuery = 'SELECT * FROM usuarios WHERE email = $1';

  try {

    const { rows } = await Query.query(loginQuery, [email]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'No hay ningun usuario registrado con ese email';
      return res.status(status.notfound).send(errorMessage);
    } 
    console.log('hola')
    if (!(dbResponse.contrasena === contrasena)) {
      errorMessage.error = 'Su credenciales son invalidas';
      return res.status(status.bad).send(errorMessage);
    }
    console.log('hola')
    
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = {
  createUsuario,
  loginUsuario
}