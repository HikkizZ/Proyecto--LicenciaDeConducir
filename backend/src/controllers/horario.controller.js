"use strcit";

const{respondSuccess,respondError} = require ("../utils/resHandler");
const HorarioService = require("../services/horario.service");
const { handleError } = require("../utils/errorHandler");





// Ver todos los horarios en la base de datos

async function getHorarios(req,res) {
      try{
         const [horarios,errorHorarios] = await HorarioService.getHorarios();
         if (errorHorarios) return respondError(req, res, 404, errorHorarios);
   
         horarios.length === 0
         ? respondSuccess(req, res, 204)
         : respondSuccess(req, res, 200, horarios);
   
      } catch(error) {
         handleError(error, "horario.controller -> getHorarios");
      }
   };

   /**
    * Crea un nuevo horario en la base de datos
    * @param {Object} req - Objeto de petición
    * 
    */

   //Crear un nuevo horario en la base de datos
 async function createHorario(req,res) {
   try{
      const {body} = req;
      const [newHorario,horarioError] = await HorarioService.createHorario(body);
      if (horarioError) return respondError(req, res, 400, horarioError);
      if (!newHorario) {
         return respondError(req, res, 400, "No se creo el horario");
      }
      respondSuccess(req, res, 201, newHorario);
   } catch(error) {
      handleError(error, "horario.controller -> createHorario");
      respondError(req, res, 500, "No se creo el horario");
   }
};


module.exports = {
    getHorarios,
    createHorario,
};


