const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/material.controller.js');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');

router.get('/', verificarToken, MaterialController.obtenerMateriales);
//router.post('/', MaterialController.crearMaterial);
//router.put('/:id', MaterialController.actualizarMaterial);
router.get('/:id', verificarToken, MaterialController.obtenerMaterial);

module.exports = router;
