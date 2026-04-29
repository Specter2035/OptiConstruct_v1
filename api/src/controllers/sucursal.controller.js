const Sucursal = require('../models/sucursal.model.js');

class SucursalController  {
    
    static async obtenerSucursales(req,res){
        try{
            const sucursal = await Sucursal.obtenerTodos();
            res.json(sucursal);

        }catch(error){
            res.status(500).json({
                mensaje: "Error al obtener sucursales",
                error: error.message
            });
        }
    }

static async obtenerSucursal(req, res) {
    try {
        const { id } = req.params;
        const sucursal = await Sucursal.obtenerPorId(id);
        if (!sucursal) {
            return res.status(404).json({
                mensaje: "sucursal no encontrada"
            });
        }
        res.json(sucursal);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la sucursal",
            error: error.message
        });
    }
}

static async crearSucursal(req,res){
    try{

        const nuevaSucursal = await Sucursal.crear(req.body);

        res.status(201).json({
            mensaje: "Sucursal creada correctamente",
            data: nuevaSucursal
        });
    }catch (error){
        res.status(500).json({
            mensaje: "Error al crear sucursal",
            error: error.message
        });
    }
}

}

module.exports = SucursalController;