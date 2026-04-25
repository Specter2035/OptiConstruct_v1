const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarios.routes.js');
const clienteRoutes=require('./routes/cliente.routes.js');
const proyectoRoutes=require('./routes/proyecto.routes.js');
const sucursalRoutes=require('./routes/sucursal.routes.js');
const materialRoutes = require('./routes/material.routes')
const materialesPlanosRoutes = require('./routes/materiales_planos.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de OptiConstruct funcionando correctamente'
    });
});

app.use('/api/usuarios',usuarioRoutes);
app.use('/api/cliente' , clienteRoutes);
app.use('/api/proyecto' , proyectoRoutes);
app.use('/api/sucursal' , sucursalRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/materiales', materialRoutes)
app.use('/api/materialesplanos', materialesPlanosRoutes);
app.use('/api/materiales-planos', materialesPlanosRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
