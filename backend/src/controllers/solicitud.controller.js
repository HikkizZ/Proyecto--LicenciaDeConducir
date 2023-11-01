"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const SolicitudService = require("../services/solicitud.service");
const UserService = require("../services/user.service")
const { userBodySchema, userIdSchema } = require("../schema/user.schema");
const { solicitudBodySchema, solicitudIdSchema } = require("../schema/solicitud.schema.js");
const { handleError } = require("../utils/errorHandler");


// crear solicitud por id de usuario
async function createSolicitud(req, res) {
  try {
    const { params } = req;

    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [newSolicitud, solicitudError] = await SolicitudService.createSolicitud(params.id);

    if (solicitudError) return respondError(req, res, 400, solicitudError);
    if (!newSolicitud) {
      return respondError(req, res, 400, "La solicitud no fue creada");
    }

    respondSuccess(req, res, 201, newSolicitud);
  } catch (error) {
    handleError(error, "solicitud.controller -> createSolicitud");
    respondError(req, res, 500, "La solicitud no fue creada");
  }
}


// ver todas las solicitudes en la base de datos
async function getSolicitudes(req, res) {
  try {

    const [solicitudes, errorSolicitudes] = await SolicitudService.getSolicitudes();
    if (errorSolicitudes) return respondError(req, res, 404, errorSolicitudes);

    respondSuccess(req, res, 200, solicitudes);
  } catch (error) {
    handleError(error, "solicitud.controller -> getSolicitudes");
    respondError(req, res, 400, error.message);
  }
}


// ver solicitud por id de usuario 
async function getSolicitudByUserId(req, res) {
  try {
    const { params } = req;
  
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [solicitud, errorSolicitud] = await SolicitudService.getSolicitudByUserId(params.id);
    if (errorSolicitud) return respondError(req, res, 404, errorSolicitud);

    respondSuccess(req, res, 200, solicitud);
  } catch (error) {
    handleError(error, "solicitud.controller -> getSolicitudByUserId");
    respondError(req, res, 500, "No se pudo obtener la solicitud");
  }
}


// Elimina una solicitud por su _id
async function deleteSolicitud(req, res) {
  try {
    
    const { params } = req;

    const solicitud = await SolicitudService.deleteSolicitud(params.id);
    !solicitud
      ? respondError(req,res,404,"Verifique el id ingresado",)
      : respondSuccess(req, res, 200, solicitud);
      
  } catch (error) {
    handleError(error, "solicitud.controller -> deleteSolicitud");
    respondError(req, res, 500, "No se pudo eliminar la solicitud");
  }
}


// Actualiza una solicitud por la _id de la solicitud
async function updateSolicitud(req, res) {
  try {
      const { params, body } = req;
      const { error: paramsError } = solicitudIdSchema.validate(params);
      if (paramsError) return respondError(req, res, 400, paramsError.message);
      const { error: bodyError } = solicitudBodySchema.validate(body);
      if (bodyError) return respondError(req, res, 400, bodyError.message);

      const [solicitud, errorSolicitud] = await SolicitudService.getSolicitudById(params.id);
      if (errorSolicitud) return respondError(req, res, 404, errorSolicitud);


      const horaLimite = new Date(solicitud.fechaCreacion.getTime() + (72 * 60 * 60 * 1000)); 
      const horaActual = new Date();

      if (horaActual <= horaLimite) {

          const [updatedSolicitud, updateError] = await SolicitudService.updateSolicitud(params.id, body);
          if (updateError) return respondError(req, res, 404, updateError);
          respondSuccess(req, res, 200, updatedSolicitud);
      } else {
  
          const [updatedSolicitud, updateError] = await SolicitudService.updateSolicitud(params.id, { estado: "fuera de plazo" });
          if (updateError) return respondError(req, res, 404, updateError);
          respondSuccess(req, res, 200, updatedSolicitud);
      }
  } catch (error) {
      handleError(error, "solicitud.controller -> updateSolicitud");
      respondError(req, res, 500, "No se pudo actualizar la solicitud");
  }
};

module.exports = {
  getSolicitudes,
  createSolicitud,
  getSolicitudByUserId,
  deleteSolicitud,
  updateSolicitud,
};
