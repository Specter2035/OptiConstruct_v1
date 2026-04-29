const express = require('express');
const router = express.Router();

const material_sucursalController = require('../controllers/material_sucursal.controller');

//Validacion de token 
const { verificarToken } = require('../middlewares/auth.middleware');

//El método post inserta un nuevo material
router.post('/', verificarToken, material_sucursalController.crearMaterialSucursal);

//Actualiza un material por el ID
router.put('/:id', verificarToken, material_sucursalController.actualizarMaterialSucursal);

// Consulta: Ver Materiales 
router.get('/', verificarToken, material_sucursalController.obtenerMateriales);

// Eliminar uno (usa :id porque necesitamos saber cuál borrar)
router.delete('/:id', verificarToken, material_sucursalController.eliminarMaterial);

module.exports = router;
