const Proyecto = require('../models/proyecto.model.js'); 

class ProyectoModelo {
    static async crearProyecto(data){
        try{
            const nuevoProyecto = new Proyecto(data);
            return await nuevoProyecto.save();
        }catch(error){
            throw error;
        }
    }
    static async obtenerPorClienteYAnio(idCliente, anio){
        try{
            return await Proyecto.find(
                {
                    idCliente: Number(idCliente),
                    fechaCreacion: {
                        $gte: new Date(`${anio}-01-01`),
                        $lte: new Date(`${anio}-12-31`)
                    }
                },
                {
                    _id: 0,
                    idCliente: 1,
                    nombre_pr: 1,
                    descripcion: 1,
                    direccionTerreno: 1,
                    fechaCreacion: 1,
                    plano: 1
                }
            );
        }catch(error){
            throw error;
        }
    }
    static async obtenerTodos(){
        try{
            return await Proyecto.find().sort({ fechaCreacion: -1 });
        }catch(error){
            throw error;
        }
    }


    static async agregarPlano(id, plano){
        try{
            return await Proyecto.findByIdAndUpdate(
                id,
                { $push: { plano } },
                { new: true }
            );
        }catch(error){
            throw error;
        }
    }

    static async actualizarUbicacion(id, data){
        try{
            return await Proyecto.findByIdAndUpdate(
                id,
                {
                    direccionTerreno: data.direccionTerreno,
                    ubicacion: {
                        lat: data.lat,
                        lng: data.lng
                    }
                },
                { new: true }
            );
        }catch(error){
            throw error;
        }
    }

    static async ObtenerProyectoPorId(idProyecto){
        try{
            return await Proyecto.findById(idProyecto);
        }catch(error){
            throw error;
        }
    }

}

module.exports = ProyectoModelo;