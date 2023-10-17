"use strict";

const Especialista = require("../models/especialista.model.js");
const { handleError } = require("../utils/errorHandler");

async function getEspecialistas() {
    try {
        const especialistas = await Especialista.find().exec();
        if (!especialistas) return [null, "No hay especialistas"];

        return [especialistas, null];
    } catch (error) {
        handleError(error, "especialista.service -> getEspecialistas");
    }
}

async function createEspecialista(especialista) {
    try {
        const { nombre, apellido, tipoExamen, disponibilidad } = especialista;

        const especialistaFound = await Especialista.findOne({ nombre: especialista.nombre });
        if (especialistaFound) return [null, "El especialista ya existe"];

        const newEspecialista = new Especialista({
            nombre,
            apellido,
            tipoExamen,
            disponibilidad,
            citasAsignadas: [],
        });
        await newEspecialista.save();

        return [newEspecialista, null];
    } catch (error) {
        handleError(error, "especialista.service -> createEspecialista");
    }
}

module.exports = {
    getEspecialistas,
    createEspecialista,
};

