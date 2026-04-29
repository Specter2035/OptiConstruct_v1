const fs = require('fs/promises');
const path = require('path');
const MaterialesPlanos = require('../models/materiales_planos.model');
const MaterialSucursal = require('../models/material_sucursal.model');

function redondearMoneda(valor) {
    return Number(Number(valor).toFixed(2));
}

function obtenerMaterialesRequeridos(capas = []) {
    const materialesPorId = new Map();

    capas.forEach((capa) => {
        const materialesCapa = Array.isArray(capa.materiales) ? capa.materiales : [];

        materialesCapa.forEach((material) => {
            const idMaterial = Number(material.idMaterial);
            const cantidad = Number(material.cantidad);

            if (!Number.isFinite(idMaterial) || !Number.isFinite(cantidad)) {
                return;
            }

            const materialAcumulado = materialesPorId.get(idMaterial) || {
                idMaterial,
                cantidad: 0,
                unidad: material.unidad,
                capas: new Set()
            };

            materialAcumulado.cantidad += cantidad;
            materialAcumulado.unidad = materialAcumulado.unidad || material.unidad;

            if (capa.nombreCapa) {
                materialAcumulado.capas.add(capa.nombreCapa);
            }

            materialesPorId.set(idMaterial, materialAcumulado);
        });
    });

    return Array.from(materialesPorId.values()).map((material) => ({
        ...material,
        cantidad: redondearMoneda(material.cantidad),
        capas: Array.from(material.capas)
    }));
}

class MaterialesPlanosController {
    static async subirArchivoDxf(req, res) {
        const archivo = req.files?.archivo?.[0] || req.files?.file?.[0];

        if (!archivo) {
            return res.status(400).json({
                mensaje: 'Archivo DXF no proporcionado'
            });
        }

        try {
            const nombrePlano = req.body.nombrePlano?.trim() || path.parse(archivo.originalname).name;
            const rutaArchivo = path.relative(process.cwd(), archivo.path).replace(/\\/g, '/');

            const nuevoDocumento = new MaterialesPlanos({
                nombrePlano,
                capas: [],
                archivoOriginal: archivo.originalname,
                archivoGuardado: archivo.filename,
                rutaArchivo,
                tamanoBytes: archivo.size,
                estadoProcesamiento: 'pendiente'
            });

            const documentoGuardado = await nuevoDocumento.save();

            return res.status(201).json({
                mensaje: 'Archivo DXF recibido correctamente',
                data: documentoGuardado,
                archivo: {
                    original: archivo.originalname,
                    guardado: archivo.filename,
                    ruta: rutaArchivo,
                    tamanoBytes: archivo.size
                }
            });
        } catch (error) {
            await fs.unlink(archivo.path).catch(() => undefined);

            return res.status(500).json({
                mensaje: 'Error al registrar el archivo DXF',
                error: error.message
            });
        }
    }

    static async insertarMaterialPlano(req, res) {
        try {
            const { nombrePlano, capas = [] } = req.body;

            if (!nombrePlano) {
                return res.status(400).json({
                    mensaje: 'nombrePlano es obligatorio'
                });
            }

            const nuevoDocumento = new MaterialesPlanos({
                nombrePlano,
                capas
            });

            const documentoGuardado = await nuevoDocumento.save();

            res.status(201).json({
                mensaje: 'Plano registrado correctamente',
                data: documentoGuardado
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al registrar el plano',
                error: error.message
            });
        }
    }

    static async crearCotizacion(req, res) {
        try {
            const { id } = req.params;
            const { idSucursal } = req.body;
            const idSucursalNumerico = Number(idSucursal);

            if (!Number.isInteger(idSucursalNumerico) || idSucursalNumerico <= 0) {
                return res.status(400).json({
                    mensaje: 'idSucursal es obligatorio y debe ser numerico'
                });
            }

            const plano = await MaterialesPlanos.findById(id);

            if (!plano) {
                return res.status(404).json({
                    mensaje: 'Plano no encontrado'
                });
            }

            const materialesRequeridos = obtenerMaterialesRequeridos(plano.capas);

            if (materialesRequeridos.length === 0) {
                return res.status(400).json({
                    mensaje: 'El plano no tiene materiales parseados para cotizar'
                });
            }

            const idsMateriales = materialesRequeridos.map((material) => material.idMaterial);
            const preciosSucursal = await MaterialSucursal.obtenerPreciosPorSucursalYMateriales(idSucursalNumerico, idsMateriales);
            const preciosPorMaterial = new Map(
                preciosSucursal.map((material) => [Number(material.IdMaterial), material])
            );

            const materialesSinPrecio = materialesRequeridos.filter(
                (material) => !preciosPorMaterial.has(material.idMaterial)
            );

            if (materialesSinPrecio.length > 0) {
                return res.status(400).json({
                    mensaje: 'La sucursal no tiene precio registrado para todos los materiales del plano',
                    materialesFaltantes: materialesSinPrecio
                });
            }

            const materialesCotizados = materialesRequeridos.map((material) => {
                const precioSucursal = preciosPorMaterial.get(material.idMaterial);
                const precioUnitario = redondearMoneda(precioSucursal.PrecioBase);
                const subtotal = redondearMoneda(material.cantidad * precioUnitario);
                const cantidadDisponible = Number(precioSucursal.CantidadDisponible);

                return {
                    idMaterial: material.idMaterial,
                    nombreMaterial: precioSucursal.nombreMaterial,
                    cantidad: material.cantidad,
                    unidad: material.unidad || precioSucursal.unidadBase,
                    precioUnitario,
                    subtotal,
                    cantidadDisponible,
                    disponible: Number.isFinite(cantidadDisponible) ? cantidadDisponible >= material.cantidad : true,
                    capas: material.capas
                };
            });

            const total = redondearMoneda(
                materialesCotizados.reduce((acumulado, material) => acumulado + material.subtotal, 0)
            );

            const cotizacion = {
                idSucursal: idSucursalNumerico,
                total,
                estado: 'generada',
                fecha: new Date(),
                materiales: materialesCotizados
            };

            plano.cotizaciones.push(cotizacion);
            await plano.save();

            return res.status(201).json({
                mensaje: 'Cotizacion generada correctamente',
                data: {
                    idPlano: plano._id,
                    nombrePlano: plano.nombrePlano,
                    cotizacion: plano.cotizaciones[plano.cotizaciones.length - 1]
                }
            });
        } catch (error) {
            return res.status(500).json({
                mensaje: 'Error al generar cotizacion',
                error: error.message
            });
        }
    }

    static async obtenerMaterialesPlanos(req, res) {
        try {
            const documentos = await MaterialesPlanos.find().sort({ createdAt: -1 });
            res.json(documentos);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener los planos',
                error: error.message
            });
        }
    }

    static async obtenerMaterialPlano(req, res) {
        try {
            const { id } = req.params;
            const documento = await MaterialesPlanos.findById(id);

            if (!documento) {
                return res.status(404).json({
                    mensaje: 'Plano no encontrado'
                });
            }

            res.json(documento);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener el plano',
                error: error.message
            });
        }
    }

    static async obtenerCapasPlano(req, res) {
        try {
            const { id } = req.params;
            const documento = await MaterialesPlanos.findById(id, {
                nombrePlano: 1,
                capas: 1
            });

            if (!documento) {
                return res.status(404).json({
                    mensaje: 'Plano no encontrado'
                });
            }

            res.json({
                _id: documento._id,
                nombrePlano: documento.nombrePlano,
                totalCapas: documento.capas.length,
                capas: documento.capas
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener las capas del plano',
                error: error.message
            });
        }
    }

    static async actualizarCapasPlano(req, res) {
        try {
            const { id } = req.params;
            const { capas } = req.body;

            if (!Array.isArray(capas)) {
                return res.status(400).json({
                    mensaje: 'capas debe ser un arreglo'
                });
            }

            const documento = await MaterialesPlanos.findByIdAndUpdate(
                id,
                { capas },
                { new: true, runValidators: true }
            );

            if (!documento) {
                return res.status(404).json({
                    mensaje: 'Plano no encontrado'
                });
            }

            res.json({
                mensaje: 'Capas actualizadas correctamente',
                data: documento
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al actualizar las capas del plano',
                error: error.message
            });
        }
    }

    static async actualizarMedicionesCapa(req, res) {
        try {
            const { id, nombreCapa } = req.params;
            const { mediciones } = req.body;

            if (!Array.isArray(mediciones)) {
                return res.status(400).json({
                    mensaje: 'mediciones debe ser un arreglo'
                });
            }

            const documento = await MaterialesPlanos.findById(id);

            if (!documento) {
                return res.status(404).json({
                    mensaje: 'Plano no encontrado'
                });
            }

            const capa = documento.capas.find(
                (item) => item.nombreCapa === nombreCapa
            );

            if (!capa) {
                return res.status(404).json({
                    mensaje: 'Capa no encontrada'
                });
            }

            capa.mediciones = mediciones;
            await documento.save();

            res.json({
                mensaje: 'Mediciones de la capa actualizadas correctamente',
                data: documento
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al actualizar las mediciones de la capa',
                error: error.message
            });
        }
    }

    static async actualizarMaterialesCapa(req, res) {
        try {
            const { id, nombreCapa } = req.params;
            const { materiales } = req.body;

            if (!Array.isArray(materiales)) {
                return res.status(400).json({
                    mensaje: 'materiales debe ser un arreglo'
                });
            }

            const documento = await MaterialesPlanos.findById(id);

            if (!documento) {
                return res.status(404).json({
                    mensaje: 'Plano no encontrado'
                });
            }

            const capa = documento.capas.find(
                (item) => item.nombreCapa === nombreCapa
            );

            if (!capa) {
                return res.status(404).json({
                    mensaje: 'Capa no encontrada'
                });
            }

            capa.materiales = materiales;
            await documento.save();

            res.json({
                mensaje: 'Materiales de la capa actualizados correctamente',
                data: documento
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al actualizar los materiales de la capa',
                error: error.message
            });
        }
    }
}

module.exports = MaterialesPlanosController;
