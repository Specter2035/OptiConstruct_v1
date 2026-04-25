const Sucursal = require('../models/sucursal.model.js');

class SucursalController{
    
    static async crearSucursal(req, res){
        try{
            const nuevaSucursal = await Sucursal.crear(req.body);

            res.status(201).json({
                mensaje: "Usuario Sucursal Creado correctamente",
                data: nuevaSucursal
            });
        }
        catch (error){
            res.status(500).json({
                mensaje: "Error al crear usuario",
                error: error.message
            });
        }
    }
    static async obtenerSucursales(req,res){
        try{
            const sucursal = await Sucursal.obtenerTodos();
            res.json(sucursal);
        }catch(error){
            res.status(500).json({
                mensaje: "Error al obtener clientes",
                error: error.message
            })
        }
    }
    static async obtenerSucursal(req,res){
        try{
            const {id} = req.params;
            const sucursal = await Sucursal.obtenerPorId(id);
            if (!sucursal){
                return res.status(404).json({
                    mensaje:"Sucursal no encontrada"
                });
            }
            res.json(sucursal);
        }catch(error){
            res.status(505).json({
                mensaje: "Error al obtener sucursal",
                error: error.mensaje
            });
        }
    }
}
module.exports = SucursalController;