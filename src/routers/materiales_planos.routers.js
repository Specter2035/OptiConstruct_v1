const express = require('express');
const router = express.Router();

const MaterialesPlanosController = require('../controllers/materiales_planos.controllers');
const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/', verificarToken, MaterialesPlanosController.obtenerMaterialesPlanos);
router.get('/:id',verificarToken, MaterialesPlanosController.obtenerMaterialPlano);
router.get('/:id/capas',verificarToken, MaterialesPlanosController.obtenerCapasPlano);
router.post('/',verificarToken, MaterialesPlanosController.insertarMaterialPlano);
router.put('/:id/capas',verificarToken, MaterialesPlanosController.actualizarCapasPlano);
router.put('/:id/capas/:nombreCapa/mediciones',verificarToken, MaterialesPlanosController.actualizarMedicionesCapa);
router.put('/:id/capas/:nombreCapa/materiales',verificarToken, MaterialesPlanosController.actualizarMaterialesCapa);

module.exports = router;