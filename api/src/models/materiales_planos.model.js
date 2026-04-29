const mongoose = require('mongoose');

const medicionSchema = new mongoose.Schema({

    tipo: { type: String,required: true },
    valor: { type: Number,required: true },
    unidad: {type: String,required: true }
}, 
{ 
    _id: false
});

const materialAsignadoSchema = new mongoose.Schema({
    
    idMaterial: { type: Number,required: true },
    cantidad: { type: Number,required: true},
    unidad: { type: String,required: true }
}, { 
    _id: false
   });

const capaSchema = new mongoose.Schema({

    nombreCapa: {type: String,required: true },
    mediciones: {type: [medicionSchema],default: []},
    materiales: {type: [materialAsignadoSchema],default: [] }
}, {
    _id: false
    });

const materialCotizadoSchema = new mongoose.Schema({
    idMaterial: { type: Number, required: true },
    nombreMaterial: { type: String, required: true },
    cantidad: { type: Number, required: true },
    unidad: { type: String, default: null },
    precioUnitario: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    cantidadDisponible: { type: Number, default: null },
    disponible: { type: Boolean, default: true },
    capas: { type: [String], default: [] }
}, {
    _id: false
});

const cotizacionSchema = new mongoose.Schema({
    idSucursal: { type: Number, required: true },
    total: { type: Number, required: true },
    estado: { type: String, default: 'generada' },
    fecha: { type: Date, default: Date.now },
    materiales: { type: [materialCotizadoSchema], default: [] }
});

const materialesPlanosSchema = new mongoose.Schema({
    
    nombrePlano: { type: String,required: true},
    capas: { type: [capaSchema], default: [] },
    archivoOriginal: { type: String, default: null },
    archivoGuardado: { type: String, default: null },
    rutaArchivo: { type: String, default: null },
    tamanoBytes: { type: Number, default: null },
    estadoProcesamiento: { type: String, default: 'pendiente' },
    cotizaciones: { type: [cotizacionSchema], default: [] }
}, {
    timestamps: true
});

module.exports = mongoose.model('MaterialesPlanos', materialesPlanosSchema, 'materiales_planos');
