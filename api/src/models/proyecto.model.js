const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema(
    {
        idCliente: {type: Number, require: true},
        nombre_pr: {type: String, require: true},
        descripcion: {type: String, require: true},  
        direccionTerreno: {type: String, default:"Pendiente"},
        fechaCreacion: {type: Date,required:true},
        ubicacion: {
        lat: { type: Number},
        lng: { type: Number}
        },
        plano : [
            {
                fecha: {type: Date,required:true},
                nombrePlano: { type: String, required:true},
                cotizacion: { type: mongoose.Schema.Types.Decimal128, required: true }
            }
        ]
    }
);

module.exports = mongoose.model('proyectos', proyectoSchema);
//http://localhost:3000/proyectos/66b0a0010000000000000001/sucursales-cercanas