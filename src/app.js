const express = require('express');
const cors = require('cors');

const materialSucursalRouters = require('./routers/material_sucursal.routers');
const usuarioRouters = require('./routers/usuarios.routers.js');
const clienteRouters= require('./routers/cliente.routers.js');
const proyectoRouters= require('./routers/proyecto.routers.js');
const sucursalRouters= require('./routers/sucursal.routers.js');
const materialRouters= require('./routers/material.routers.js');
const materiales_planosRouters = require('./routers/materiales_planos.routers.js');


const authRouters = require('./routers/auth.routers'); //

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({
        mensaje: 'API de nómina híbrida funcionando correctamente'
    });

});

//agregar por cada uno de los routers. 
app.use('/api/material_sucursal', materialSucursalRouters); //Retiré el .routers al final
app.use('/api/usuarios', usuarioRouters);
app.use('/api/cliente' , clienteRouters);
app.use('/api/proyecto' , proyectoRouters);
app.use('/api/sucursal' , sucursalRouters);
app.use('/api/auth', authRouters); // Esto crea la URL /api/auth/login
app.use('/api/material', materialRouters);
app.use('/api/materiales_planos', materiales_planosRouters);

module.exports = app;


