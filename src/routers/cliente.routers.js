const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/cliente.controller');
router.get('/',ClienteController.obtenerClientes);// VER todos
router.get('/:id',ClienteController.obtenerCliente);// uno por id
router.post('/', ClienteController.crearCliente);///CREAR


module.exports = router;