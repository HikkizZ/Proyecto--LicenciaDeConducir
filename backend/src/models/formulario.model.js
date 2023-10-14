"use strict";
const mongoose = require("mongoose");


const formularioSchema = new mongoose.Schema(
    
    //  desarrollar formulario
);

const Formulario = mongoose.model("Formulario", formularioSchema);

module.exports = Formulario;
