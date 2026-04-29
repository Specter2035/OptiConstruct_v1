const express = require('express');
const router = express.Router();

const MaterialesPlanosController = require('../controllers/materiales_planos.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');

router.get('/', verificarToken, MaterialesPlanosController.obtenerMaterialesPlanos);
//router.get('/:id', MaterialesPlanosController.obtenerMaterialPlano);
router.get('/:id/capas', verificarToken, MaterialesPlanosController.obtenerCapasPlano);
//router.post('/', MaterialesPlanosController.insertarMaterialPlano);
//router.put('/:id/capas', MaterialesPlanosController.actualizarCapasPlano);
//router.put('/:id/capas/:nombreCapa/mediciones', MaterialesPlanosController.actualizarMedicionesCapa);
//router.put('/:id/capas/:nombreCapa/materiales', MaterialesPlanosController.actualizarMaterialesCapa);

module.exports = router;