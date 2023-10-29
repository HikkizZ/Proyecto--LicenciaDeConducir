// Modelo de documentos o archivos con CommonsJS
"use strict";

const mongoose = require("mongoose");

// Modelo de documentos o archivos
const documentSchema = new mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    // usuarioId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    estado: {
        type: String,
        enum: ["pendiente", "aprobado", "rechazado"],
        default: "pendiente",
    },
    },
    {
    versionKey: false,
    timestamps: true,
    },
);

const Document = new mongoose.model("Document", documentSchema);

module.exports = Document;
