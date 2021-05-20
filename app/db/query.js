const { pool } = require('./pool')

module.exports = {
  /**
    Este es como la estructura donde se ejecuta un query que tu le mandes por parametro
   */
  query(queryText, params) {
    return new Promise((resolve, reject) => {
      pool.query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err)
          reject(err);
        });
    });
  },
};