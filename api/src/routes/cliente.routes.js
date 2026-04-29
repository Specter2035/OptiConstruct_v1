const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/cliente.controller');
const { verificarToken,verificarRol } = require('../middlewares/auth.middleware');


//router.get('/',verificarToken,ClienteController.obtenerClientes);// VER todos
router.get('/:id',verificarToken,ClienteController.obtenerCliente);// uno por id
router.post('/', ClienteController.crearCliente);///CREAR


module.exports = router;