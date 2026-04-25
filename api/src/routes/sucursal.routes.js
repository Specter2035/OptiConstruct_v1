const express = require('express');
const router = express.Router();
const SucursalController = require('../controllers/sucursal.controller');
router.post ('/', SucursalController.crearSucursal);
router.get('/',SucursalController.obtenerSucursales);
router.get('/:id',SucursalController.obtenerSucursal);

module.exports = router;