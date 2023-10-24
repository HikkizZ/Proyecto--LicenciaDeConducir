"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'documentos'
const documentSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        archivo: {
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
        },
    },
    {
        versionKey: false,
    }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;