const express = require('express');

const app =  express();

const proyectosRoutes = require('./app/routes/proyectoRoutes');
const usuarioRoutes = require('./app/routes/usuarioRoutes');


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('', usuarioRoutes);
app.use('', proyectosRoutes);


app.listen(process.env.PORT || 8000);
console.log('Corriendo en el puerto 8000');