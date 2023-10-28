//se crea un modelo para agendar horarios disponibles
"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



/**
* crear un modelo para una agenda de horario de disponibilidad
 * @typedef {Object} Horario
    * @property {Date} Fecha
    * @property {String} Estado
    * 
 */

//Horario de disponibilidad para agendar 
const horarioSchema = new mongoose.Schema({
    Fecha: {
        type: Date,
        required: true,
        unique: true,
    },
    Estado: {
        type: [{
            type: String,
            enum: ["Disponible", "Reservado"],
            default: ["Disponible"]
        }],
        required: true,
    },
    // Usuario: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },
}, {
    versionKey: false,
});



const Horario = mongoose.model("Horario" , horarioSchema);

module.exports = Horario;

