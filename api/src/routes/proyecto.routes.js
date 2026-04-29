const express = require('express');
const router = express.Router();

const ProyectoController = require('../controllers/proyecto.controller');
const { verificarToken,verificarRol } = require('../middlewares/auth.middleware');


//router.get('/',ProyectoController.obtenerProyectos);// VER todos
router.get('/cliente/:idCliente/anio/:anio',verificarToken, ProyectoController.obtenerProyectosPorCliente);  
router.post('/',verificarToken,verificarRol(1),ProyectoController.registrarProyecto);// crear proyecto
router.put('/:id/plano', verificarToken,verificarRol(1),ProyectoController.subirPlano);//subir plano a un proyecto 
router.put('/:id/ubicacion',verificarToken,verificarRol(1), ProyectoController.actualizarUbicacion);//subir ubicacion del proyecto
router.get('/:idProyecto/sucursalesCercanas',verificarToken,ProyectoController.ObtenerSucursalesCercanas);

module.exports = router;