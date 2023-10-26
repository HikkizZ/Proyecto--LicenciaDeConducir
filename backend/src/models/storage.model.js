"use strict";
// Modelo del storage de archivos
const mongoose = require('mongoose');

// Esquema de la coleccion 'storage'. Donde se guardan los archivos
const storageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        filename: {
            type: String,
            required: true,
        },
        usuarioId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        estado: {
            type: String,
            enum: ['Pendiente', 'Aprobado', 'Rechazado'],
            default: 'Pendiente'
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }

);

module.exports = model('Storage', storageSchema);