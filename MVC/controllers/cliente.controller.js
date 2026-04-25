const Cliente = require('../models/cliente.model.js');

class ClienteController  {
    static async obtenerClientes(req,res){
        try{
            const clientes = await Cliente.obtenerTodos();
            res.json(clientes);

        }catch(error){
            res.status(500).json({
                mensaje: "Error al obtener clientes",
                error: error.message
            });
        }
    }

    static async obtenerCliente(req, res) {
        try {
            const { id } = req.params;
            const cliente = await Cliente.obtenerPorId(id);
            if (!cliente) {
                return res.status(404).json({
                    mensaje: "cliente no encontrado"
                });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener cliente",
                error: error.message
            });
        }
    }

    static async crearCliente(req,res){
        try{

            const nuevoCliente = await Cliente.crear(req.body);

            res.status(201).json({
                mensaje: "Cliente creado correctamente",
                data: nuevoCliente
            });
        }catch (error){
            res.status(500).json({
                mensaje: "Error al crear cliente",
                error: error.message
            });
        }
    }

}

module.exports = ClienteController;