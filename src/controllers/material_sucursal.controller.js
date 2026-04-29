const MaterialSucursal = require('../models/material_sucursal.models'); 

class MaterialSucursalController {

    //Me traigo los datos asignados de models
    //Insert MaterialSucursal
    static async crearMaterialSucursal(req, res) {
        try {
                const nuevoMaterialSucursal = await MaterialSucursal.crearMaterialSucursal(req.body);

                res.status(201).json({
                    mensaje: "Material Creado Correctamente!",
                    data: nuevoMaterialSucursal
                });
        }
        catch (error)
        {
            res.status(500).json({
                mensaje: "Error al crear Material:",
                error: error.message
            })
        }
    }

    //Actualizar MaterialSucursal 
    static async actualizarMaterialSucursal(req, res){
        try
        {
            const {id} = req.params;
            const actualizado = await MaterialSucursal.actualizarMaterialSucursal(id,req.body);

            if(!actualizado){
                return res.status(400).json({
                    mensaje: "Usuario no encontrado!"
                });
            }
            res.json({
                mensajes: "Material actualizado correctamente"
            });

        }
        catch (error)
        {
            res.status(500).json({
                mensaje: "Error al actualizar el material",
                error: error.message
            });
        }

    }
    
    // Obtener materiales
    static async obtenerMateriales(req, res) {
        try {
             const materiales = await MaterialSucursal.obtenerTodos();
            res.status(200).json(materiales);
            } 
    
         catch (error) {
             res.status(500).json({ 
                mensaje: "Error al obtener datos", error: error.message 
                });
        }
    }

    // Eliminar material
    static async eliminarMaterial(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await MaterialSucursal.eliminarMaterialSucursal(id);
            
            if (!eliminado) {
                return res.status(404).json({ mensaje: "Material no encontrado"     
                });
            }
            res.json({ 
                mensaje: "Material eliminado correctamente" 
                 });
        } 
        catch (error) {
            res.status(500).json({
                 mensaje: "Error al eliminar", error: error.message 
                });
        }
    }

}

module.exports = MaterialSucursalController;
