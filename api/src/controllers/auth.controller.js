const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');

class AuthController {
    static async login(req,res) {
        try{
            const { Correo, Contrasenia} = req.body;

            if (!Correo || !Contrasenia){
                return res.status(400).json({
                    mensaje: 'Correo y contraseña son obligatorios'
                });
            }

            const usuario = await Usuario.obtenerPorCorreo(Correo);

            if (!usuario){
                    return res.status(500).json({
                    mensaje: 'Credenciales invalidas'       
                });
            }
        
            /*
            if (!usuario.activo){
                return res.status(401).json({
                    mensaje : 'usuario inactivo'
                })
            }*/

            const contraseniaValida = await bcrypt.compare(Contrasenia,usuario.Contrasenia); //quite password_hash porque era columna de la miss

            if (!contraseniaValida){
                    return res.status(401).json({
                    mensaje: 'Credenciales invalidas'
                });
            }

            const token = jwt.sign(
                {
                    IdUsuario: usuario.IdUsuario,
                    NombreUsuario: usuario.NombreUsuario,
                    Correo: usuario.Correo,
                    Tipo:usuario.Tipo
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            );

            res.json({
                mensaje: 'Login correcto',
                token,
                usuario: {
                    IdUsuario: usuario.IdUsuario,
                    NombreUsuario: usuario.NombreUsuario,
                    Correo: usuario.Correo,
                    Tipo:usuario.Tipo
                }
            });

        }catch(error){
            res.status(500).json({
                mensaje: 'Error de autenticacion',
                error: error.message
            });
        }
    }

    static async perfil(req,res) {
        res.json ({
            mensaje: 'Acceso autorizado',
            usuario: req.usuario
        });
    }
}

module.exports = AuthController;