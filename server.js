const express = require('express');

const app =  express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use(require('./app/routes/usuarioRoutes'))
console.log('hola')

app.listen(process.env.PORT || 8000);
console.log('Corriendo en el puerto 8000');