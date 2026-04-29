const express = require('express');
const router = express.Router();
const ProyectoController = require('../controllers/proyecto.controllers');

router.get('/',ProyectoController.obtenerProyectos);// VER todos
router.get('/cliente/:idCliente/anio/:anio', ProyectoController.obtenerProyectosPorCliente); 
router.post('/',ProyectoController.registrarProyecto);// crear proyecto
router.put('/:id/plano', ProyectoController.subirPlano);//subir plano a un proyecto 
router.put('/:id/ubicacion', ProyectoController.actualizarUbicacion);//subir ubicacion del proyecto
router.get('/:idProyecto/sucursalesCercanas',ProyectoController.ObtenerSucursalesCercanas);
module.exports = router;