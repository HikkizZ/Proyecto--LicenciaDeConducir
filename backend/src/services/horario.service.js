"use strict";

const Horario = require("../models/horario.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * //obtiene todos los horarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los horarios
 * 
 */


async function getHorarios() {
    try {
        const horarios = await Horario.find({}).exec();
        if (!horarios || horarios.length === 0) return [null, "No hay horarios disponibles"];

        return [horarios, null];

    } catch (error) {
        handleError(error, "horario.service -> getHorarios");

    }

};

//ver los horarios por id 
async function getHorarioById(horarioId) {
    try {
        const horario = await Horario.findById(horarioId).exec();
        if (!horario) return [null, "No se encontro el horario"];

        return [horario, null];

    } catch (error) {
        handleError(error, "horario.service -> getHorarioById");

    }

}


/**
 * Crea un nuevo horario en la base de datos
 * @param {Object} horario Objeto de horario
 * @returns {Promise} Promesa con el objeto de horario creado
 */
 



async function createHorario(horario) {

    try{
        const {Fecha , Estado } = horario;
        const horarioFound = await Horario.findOne({
            Fecha: horario.Fecha
        });
        if(horarioFound) return [null," El Horario ya esta registrado"];
        

        const newHorario = new Horario ({
        Fecha,
        Estado,
        });

      const myHorario =  await newHorario.save();
        return [myHorario,null];
    } catch (error) {
        
        handleError(error,"horario.service -> createHorario");

    }
};

// actualizar el estado del horario por id

async function updateHorarioById(horarioId, horario) {
    try {
        const horarioUpdated = await Horario.findByIdAndUpdate(horarioId, horario, {
            new: true
        }).exec();
        if (!horarioUpdated) return [null, "No se encontro el horario"];

        return [horarioUpdated, null];

    } catch (error) {
        handleError(error, "horario.service -> updateHorarioById");

    }
};

// eliminar un horario de la base de datos por id 
async function deleteHorarioById(horarioId) {
    try {
        const horarioDeleted = await Horario.findByIdAndDelete(horarioId).exec();
        if (!horarioDeleted) return [null, "No se encontro el horario"];

        return [horarioDeleted, null];

    } catch (error) {
        handleError(error, "horario.service -> deleteHorarioById");

    }
};


module.exports = {
    getHorarios,
    createHorario,
    getHorarioById,
    updateHorarioById,
    deleteHorarioById,
   
};
