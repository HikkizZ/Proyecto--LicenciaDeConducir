"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");


// Crea el esquema de la coleccion 'citas'
const citaSchema = new mongoose.Schema(
    {
        fecha: {
          type: Date,
          required: true,
        },
        hora: {
            type: String,
            required: true,
          },
          especialistaId: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Especialista",
              required: true,
            },
          ],
          usuarioId: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
          ],
          estado: {
            type: String,
            enum: ['Pendiente', 'Confirmada', 'Realizada', 'Cancelada'],
            required: true,
          }
    },
    {
        versionKey: false,
      }

);

const User = mongoose.model("Cita", userSchema);


module.exports = Citas;