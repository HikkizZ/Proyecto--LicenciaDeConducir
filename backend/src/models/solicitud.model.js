"use strict";
const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema(
   {
      IdUsuario: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
         required: true,
      },
      nombre: {
         type: String,
         required: true,
      },
      rut: {
         type: String,
         required: true,
      },
      correo: {
         type: String,
         required: true,
         unique: true,
      },
      fechaInicio: {
         type: Date,
         required: true,
         default: Date.now(),
      },
      estado: {
         type: String,
         enum: ["Pendiente", "Aceptada", "Rechazada", "Fuera de plazo"],
         default: "Pendiente",
         required: true,
      },
   }

);


/** Modelo de datos 'solicitud' */
const Solicitud = mongoose.model("Solicitud", solicitudSchema);

// Exporta el modelo de datos 'solicitud'
module.exports = Solicitud;