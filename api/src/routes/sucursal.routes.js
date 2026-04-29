const express = require('express');
const router = express.Router();

const SucursalController = require('../controllers/sucursal.controller');
const { verificarToken,verificarRol } = require('../middlewares/auth.middleware');

router.get('/',verificarToken,SucursalController.obtenerSucursales);// VER todas 
router.get('/:id',verificarToken,SucursalController.obtenerSucursal);// una por id 
router.post('/',verificarToken,verificarRol(2),SucursalController.crearSucursal);///CREAR (sucursal)

module.exports = router;
