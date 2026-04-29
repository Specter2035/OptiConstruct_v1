const Material = require('../models/material.model');

class MaterialController {
    static async obtenerMateriales(req, res) {
        try {
            const materiales = await Material.obtenerTodos();
            res.json(materiales);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener materiales',
                error: error.message
            });
        }
    }

    static async obtenerMaterial(req, res) {
        try {
            const { id } = req.params;
            const material = await Material.obtenerPorId(id);

            if (!material) {
                return res.status(404).json({
                    mensaje: 'Material no encontrado'
                });
            }

            res.json(material);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener material',
                error: error.message
            });
        }
    }

    static async crearMaterial(req, res) {
        try {
            const {
                nombreMaterial,
                descripcion,
                unidadBase,
                categoria
            } = req.body;

            if (!nombreMaterial || !descripcion || !unidadBase || !categoria) {
                return res.status(400).json({
                    mensaje: 'nombreMaterial, descripcion, unidadBase y categoria son obligatorios'
                });
            }

            const nuevoMaterial = await Material.crear({
                nombreMaterial,
                descripcion,
                unidadBase,
                categoria
            });

            res.status(201).json({
                mensaje: 'Material creado correctamente',
                data: nuevoMaterial
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al crear material',
                error: error.message
            });
        }
    }

    static async actualizarMaterial(req, res) {
        try {
            const { id } = req.params;
            const {
                nombreMaterial,
                descripcion,
                unidadBase,
                categoria
            } = req.body;

            if (!nombreMaterial || !descripcion || !unidadBase || !categoria) {
                return res.status(400).json({
                    mensaje: 'nombreMaterial, descripcion, unidadBase y categoria son obligatorios'
                });
            }

            const materialActualizado = await Material.actualizar(id, {
                nombreMaterial,
                descripcion,
                unidadBase,
                categoria
            });

            if (!materialActualizado) {
                return res.status(404).json({
                    mensaje: 'Material no encontrado'
                });
            }

            res.json({
                mensaje: 'Material actualizado correctamente',
                data: materialActualizado
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al actualizar material',
                error: error.message
            });
        }
    }
}

module.exports = MaterialController;
