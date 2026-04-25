const Proyecto = require('../models/proyectoModelo.model.js');
const Cliente = require('../models/cliente.model.js');
const Sucursal = require('../models/sucursal.model.js');

class ProyectoController {
    static async registrarProyecto(req,res){
        try{

            const {
                idCliente,
                nombre_pr,
                descripcion,
                fechaCreacion,
                plano
            } = req.body;

            const cliente = await Cliente.obtenerPorId(idCliente);

            if (!cliente){
                return res.status(404).json({
                    mensaje: "usuario no encontrado"
                });
            }

            const proyectoGuardado = await Proyecto.crearProyecto({
                idCliente: cliente.IdCliente,
                nombre_pr,
                descripcion,
                fechaCreacion,
                plano
            });

            return res.status(201).json({
                mensaje: 'proyecto registrado correctamente',
                data: proyectoGuardado
            });

        }catch(error){
            return res.status(500).json({
                mensaje: 'error al registrar proyecto',
                error: error.message
            });
        }
    }
    static async obtenerProyectosPorCliente(req,res){
        try{

            const { idCliente, anio } = req.params;

            const proyectos = await Proyecto.obtenerPorClienteYAnio(idCliente, anio);

            return res.json(proyectos);

        }catch(error){
            return res.status(500).json({
                mensaje:"Error al obtener proyectos",
                error: error.message
            });
        }
    }
    static async obtenerProyectos(req,res){
        try{

            const proyectos = await Proyecto.obtenerTodos();

            return res.json(proyectos);

        }catch(error){
            return res.status(500).json({
                mensaje:"Error al consultar los proyectos",
                error: error.message
            });
        }
    }
    static async subirPlano(req, res){
        try{

            const { id } = req.params;
            const { fecha, nombrePlano, cotizacion } = req.body;

            const proyectoActualizado = await Proyecto.agregarPlano(id, {
                fecha,
                nombrePlano,
                cotizacion
            });

            if (!proyectoActualizado){
                return res.status(404).json({
                    mensaje: "Proyecto no encontrado"
                });
            }

            return res.json({
                mensaje: "Plano agregado correctamente",
                data: proyectoActualizado
            });

        }catch(error){
            return res.status(500).json({
                mensaje: "Error al subir plano",
                error: error.message
            });
        }
    }
    static async actualizarUbicacion(req, res){
        try{

            const { id } = req.params;
            const { direccionTerreno, lat, lng } = req.body;

            const proyectoActualizado = await Proyecto.actualizarUbicacion(id, {
                direccionTerreno,
                lat,
                lng
            });

            if (!proyectoActualizado){
                return res.status(404).json({
                    mensaje: "Proyecto no encontrado"
                });
            }

            return res.json({
                mensaje: "Ubicación actualizada correctamente",
                data: proyectoActualizado
            });

        }catch(error){
            return res.status(500).json({
                mensaje: "Error al actualizar ubicación",
                error: error.message
            });
        }
    }

    static async ObtenerSucursalesCercanas(req,res){
        try{
            const {idProyecto} = req.params;

            const proyecto = await Proyecto.ObtenerProyectoPorId(idProyecto);

            if(!proyecto){
                return res.status(404).json({
                    mensaje: "Proyecto no encontrado"
                });
            }

            const lat1 = proyecto.ubicacion.lat;
            const lng1 = proyecto.ubicacion.lng;

            const sucursal = await Sucursal.obtenerTodos();

            const RADIO_TIERRA = 6371;
            const toRad = (deg) => deg * Math.PI / 180;

            const calcularDistancia = (lat1,lng1,lat2,lng2) => {
                const dLat = toRad(lat2 - lat1);
                const dLng = toRad(lng2 - lng1);

                const a =
                    Math.sin(dLat / 2) ** 2 +
                    Math.cos(toRad(lat1)) *
                    Math.cos(toRad(lat2)) *
                    Math.sin(dLng / 2) ** 2;

                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                return RADIO_TIERRA * c;
            };

            const sucursalesCercanas = sucursal
                .map(s => ({
                    ...s,
                    distancia: calcularDistancia(lat1, lng1, s.Lat, s.Lng)
                }))
                .filter(s => s.distancia <= 100)
                .sort((a, b) => a.distancia - b.distancia);

            return res.json({
                proyecto: proyecto.nombre_pr,
                total: sucursalesCercanas.length,
                sucursales: sucursalesCercanas
            });


        }catch(error){
            return res.status(500).json({
                mensaje: "Error interno",
                error: error.message
            });
        }
    }

}

module.exports = ProyectoController;