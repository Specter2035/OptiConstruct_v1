const Usuario = require('../models/usuarios.models.js');

class UsuarioController{
    static async obtenerUsuarios(req, res){
        try{
            const Usuarios = await Usuario.obtenerTodos();
            res.json(Usuarios);
        } catch(error){
            res.status(500).json({
                mensaje: "Error al obtener clientes",
                error: error.message
            });

        }
    }

    static async crearUsuario(req, res){
        try{
            const nuevoUsuario = await Usuario.crear(req.body);

            res.status(201).json({
                mensaje: "Usuario Creado correctamente",
                data: nuevoUsuario
            });
        }
        catch (error){
            res.status(500).json({
                mensaje: "Error al crear usuario",
                error: error.message
            });
        }
    }

    static async obtenerUsuario(req, res) {
    try {
        const { id } = req.params;
        const usuario = await Usuario.obtenerPorId(id);
        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener usuario",
            error: error.message
        });
    }
    }

    static async actualizarUsuario(req,res) {
        try {
            const {id} = req.params;
            const actualizado = await Usuario.actualizar(id, req.body);

            if(!actualizado){
                return res.status(404).json({
                    mensaje:"Usuario no encontrado"
                });
            }
            res.json({
                mensaje:"Usuario actualizado correctamente"
            });
        }
        catch (error){
            res.status(500).json({
                mensaje: "Error al actualizar usuario",
                error: error.message
            });

        }
    }
    static async LogueoUsuario(req,res){
        try{
            const {NombreUsuario, Contrasenia} = req.body;
            if (!NombreUsuario || !Contrasenia) {
                return res.status(400).json({
                    message: 'Faltan datos'
                });
            }

            const usuario= await Usuario.login(NombreUsuario);

            if (!usuario) {
                return res.status(401).json({
                    message: 'Usuario no encontrado'
                });
            }

            if (usuario.Contrasenia !== Contrasenia) {
                return res.status(401).json({
                    message: 'Contraseña incorrecta'
                });
            }

            return res.json({
                message: 'Login exitoso',
                usuario: {
                    IdUsuario: usuario.IdUsuario,
                    NombreCompleto: usuario.NombreCompleto,
                    NombreUsuario: usuario.NombreUsuario,
                    Tipo: usuario.Tipo
                }
            });
        }catch(error){
            return res.status(500).json({
                message: 'Error en el servidor',
                error: error.message
            });
        }
    }
}
module.exports = UsuarioController;