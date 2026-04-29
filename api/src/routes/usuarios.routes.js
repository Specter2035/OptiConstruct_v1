const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuarios.controller');

//router.get('/',UsuarioController.obtenerUsuarios);// VER todos
router.get('/:id', UsuarioController.obtenerUsuario); // uno por id
router.post('/', UsuarioController.crearUsuario);  ///CREAR
router.get('/correo/:Correo', UsuarioController.obtenerUsuarioPorCorreo);  ///CREAR
router.put('/:id',UsuarioController.actualizarUsuario ); //ACTUALZAR

module.exports = router;









/*
router.delete('/:id',UsuarioController.eliminarUsuario );

*/