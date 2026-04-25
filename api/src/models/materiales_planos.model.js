const mongoose = require('mongoose');

const medicionSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    unidad: {
        type: String,
        required: true
    }
}, { _id: false });

const materialAsignadoSchema = new mongoose.Schema({
    idMaterial: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    unidad: {
        type: String,
        required: true
    }
}, { _id: false });

const capaSchema = new mongoose.Schema({
    nombreCapa: {
        type: String,
        required: true
    },
    mediciones: {
        type: [medicionSchema],
        default: []
    },
    materiales: {
        type: [materialAsignadoSchema],
        default: []
    }
}, { _id: false });

const materialesPlanosSchema = new mongoose.Schema({
    nombrePlano: {
        type: String,
        required: true
    },
    capas: {
        type: [capaSchema],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MaterialesPlanos', materialesPlanosSchema, 'materiales_planos');