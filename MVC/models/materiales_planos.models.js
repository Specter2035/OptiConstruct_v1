const mongoose = require('mongoose');

const materiales_planosSchema = new materiales_planosSchema.Schema(
    {
        idMaterial: {type: Number, required: true},
        nombrePlano: {type: String, required: true},
        capas: {
                nombreCapa: {type: String, requiered: true}
        },
        mediciones: {
            tipo: {type: String, required: true},
            valor: {type: Number, required: true},
            unidad: {type: String, required: true}
        }
    }
)