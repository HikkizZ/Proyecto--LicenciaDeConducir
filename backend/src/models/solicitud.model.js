"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const solicitudSchema = new mongoose.Schema({

  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
  estado: { 
    type: String,
    enum: ["pendiente", "aprobada", "rechazada", "fuera de plazo"],
    default: "pendiente",
  },
});

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

module.exports = Solicitud;
