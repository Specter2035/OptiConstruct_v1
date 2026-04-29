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

           /* if (!usuario.activo){
                return res.status(403).json({
                mensaje: 'Usuario inactivo'
                });
            } */

            //const passwordValido = await bcrypt.compare(password, usuario.password_hash);
            const passwordValido = (password === usuario.Contrasenia);

            if (!passwordValido){
                return res.status(401).json({
                mensaje: 'Credenciales inválidas'
                });
            }

            const token = jwt.sign(
                {
                    IdUsuario: usuario.IdUsuario,
                    NombreCompleto: usuario.NombreCompleto,
                    NombreUsuario: usuario.NombreUsuario,
                    Contrasenia: usuario.Contrasenia,
                    Correo: usuario.Correo,
                    rol: usuario.rol
                },
                'clave_secreta_provisional_123',
                {expiresIn:'1h'}
            );
            res.json({
                mensaje: 'Login Correcto',
                token,
                usuario: {
                    IdUsuario: usuario.IdUsuario,
                    NombreCompleto: usuario.NombreCompleto,
                    NombreUsuario: usuario.NombreUsuario,
                    Contrasenia: usuario.Contrasenia,
                    Correo: usuario.Correo,
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