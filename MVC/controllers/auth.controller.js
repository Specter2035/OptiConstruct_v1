const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.models');

class AuthController {
    static async login (req, res) {
        try {
            const { correo, password } = req.body;
            if (!correo || !password ){
                return res.status(400).json({
                    mensaje: 'correo y password son obligatorios'
                });
            }
            const usuario = await Usuario.obtenerPorCorreo(correo);

            if (!usuario){
                return res.status(401).json({
                mensaje: 'Credenciales inválidas'
                });
            }

            if (!usuario.activo){
                return res.status(403).json({
                mensaje: 'Usuario inactivo'
                });
            }

            const passwordValido = await bcrypt.compare(password, usuario.password_hash);

            if (!passwordValido){
                return res.status(401).json({
                mensaje: 'Credenciales inválidas'
                });
            }

            const token = jwt.sign(
                {
                    id_usuario: usuario.id_usuario,
                    nombre_usuario: usuario.nombre_usuario,
                    correo: usuario.correo,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_SECRET_IN || '1h'}
            );
            res.json({
                mensaje: 'Login Correcto',
                token,
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nombre_usuario: usuario.nombre_usuario,
                    correo: usuario.correo,
                    rol: usuario.rol
                }
            });
        }
        catch (error) {
            res.status(500).json({
                mensaje: 'Error en autenticación',
                error: error.message
            });
        }
    }
    static async perfil (req, res) {
        res.json({
            mensaje: 'Acceso autorizado',
            usuario: req.usuario
        });
    }
}

module.exports = AuthController;