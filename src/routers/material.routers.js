const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/material.controller.js');

const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/', verificarToken, MaterialController.obtenerMateriales);
router.post('/',verificarToken, MaterialController.crearMaterial);
router.put('/:id',verificarToken, MaterialController.actualizarMaterial);
router.get('/:id',verificarToken, MaterialController.obtenerMaterial);

module.exports = router;