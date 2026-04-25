const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarios.controllers.js');
router.get ('/', UsuarioController.obtenerUsuarios);
router.get ('/:id', UsuarioController.obtenerUsuario);
router.post ('/', UsuarioController.crearUsuario);
router.put('/:id',UsuarioController.actualizarUsuario ); 
router.post('/login', UsuarioController.LogueoUsuario);


module.exports = router;
