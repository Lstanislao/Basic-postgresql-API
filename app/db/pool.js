const  { Pool } = require('pg');

//Esta es la conexion a la base de datos
const pool = new Pool({
    user: 'xcqztxpo',
    host: 'queenie.db.elephantsql.com',
    database: 'xcqztxpo',
    password: '5jcZl74Hr1niKD7GIOJta_Ut6uc9Lycl',
    port: 5432,
});

module.exports = {
  pool
}