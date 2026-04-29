const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema(
    {
        idCliente: { type: Number,required: true},
        nombre_pr: { type: String, required:true},
        descripcion: {type: String, required:true},
        direccionTerreno: {type: String, default:"Pendiente"},
        fechaCreacion: {type: Date,required:true},
        ubicacion: {
            lat: { type: Number, default: null },
            lng: { type: Number, default: null }
        },
        plano : [
            {
            fecha: {type: Date,required:true},
            nombrePlano: { type: String, required:true},
            cotizacion: { type: mongoose.Schema.Types.Decimal128, required: true }
        }
    ]
    }
)

module.exports = mongoose.model('Proyecto', proyectoSchema);

