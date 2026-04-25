const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/material.controller.js');

router.get('/', MaterialController.obtenerMateriales);
router.post('/', MaterialController.crearMaterial);
router.put('/:id', MaterialController.actualizarMaterial);
router.get('/:id', MaterialController.obtenerMaterial);

module.exports = router;
