const bcrypt = require('bcryptjs');
//FUNCIONES PARA VALIDAR COSAS Y SIMPLICAR EL CODIGO EN EL CONTROLLER
/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */

const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedpassword = bcrypt.hashSync(password, salt);

  };

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

module.exports = {
  hashPassword,
  comparePassword
};