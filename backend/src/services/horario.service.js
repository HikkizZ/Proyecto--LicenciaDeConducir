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
        if(horarioFound) return [null," El Horario ya esta reservado"];
        

        const newHorario = new Horario ({
        Fecha,
        Estado,
        });

      const myHorario =  await newHorario.save();
        return [myHorario,null];
    } catch (error) {
        
        handleError(error,"horario.service -> createHorario");

    }
}

module.exports = {
    getHorarios,
    createHorario,
};
