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


   // ver los horarios por id
   async function getHorarioById(req,res) {  
      try{
         const {horarioId} = req.params;
         const [horario,errorHorario] = await HorarioService.getHorarioById(horarioId);
         if (errorHorario) return respondError(req, res, 404, errorHorario);
         if (!horario) {
            return respondError(req, res, 404, "No se encontro el horario");
         }
         respondSuccess(req, res, 200, horario);
      } catch(error) {
         handleError(error, "horario.controller -> getHorarioById");
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

// Actualizar un horario en la base de datos por id y que cambie su estado a reservado
async function updateHorarioById(req,res) {
 const updateHorarioById = await HorarioService.updateHorarioById(
   req.params.horarioId,
   req.body,
   { new: true }  
   );
   res.status(200).json(updateHorarioById);
 };
 
   // Eliminar un horario en la base de datos por id
   async function deleteHorarioById(req,res) {
      try{
         const {horarioId} = req.params;
         const [horario,errorHorario] = await HorarioService.deleteHorarioById(horarioId);
         if (errorHorario) return respondError(req, res, 404, errorHorario);
         if (!horario) {
            return respondError(req, res, 404, "No se encontro el horario");
         }
         respondSuccess(req, res, 200, horario);
      } catch(error) {
         handleError(error, "horario.controller -> deleteHorarioById");
      }
   };




module.exports = {
    getHorarios,
    createHorario,
    getHorarioById,
    updateHorarioById,
    deleteHorarioById


};


