"use strict";
const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema(
{
   IdUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
     },
     fechaInicio: {
        type: Date,
        required: true,
        default: Date.now(),
     },

   estado: {
      type: String,
      enum: ["Pendiente", "Aceptada", "Rechazada"],
      default: "Pendiente",
      required: true,
   },
}

);

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

module.exports = Solicitud;