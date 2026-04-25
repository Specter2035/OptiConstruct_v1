const express = require("express");
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const { verificarToken} = require('../middleware/auth.middleware');

router.post('/login', AuthController.login);
router.get('/perfil', verificarToken, AuthController.perfil);

module.exports = router;