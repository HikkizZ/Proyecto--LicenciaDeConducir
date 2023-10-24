"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const SolicitudService = require("../services/solicitud.service");
const { userBodySchema, userIdSchema } = require("../schema/user.schema");
const { handleError } = require("../utils/errorHandler");

// ver todas las solicitudes en la base de datos
async function getSolicitudes(req, res) {
  try {
    const [solicitudes, errorSolicitudes] = await SolicitudService.getSolicitudes();
    if (errorSolicitudes) return respondError(req, res, 404, errorSolicitudes);

    solicitudes.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, solicitudes);
  } catch (error) {
    handleError(error, "solicitud.controller -> getSolicitudes");
    respondError(req, res, 400, error.message);
  }
}


async function createSolicitud(req, res) {
  try {
    const { body } = req;

    const [newSolicitud, solicitudError] = await SolicitudService.createSolicitud(body.id);

    if (solicitudError) return respondError(req, res, 400, solicitudError);
    if (!newSolicitud) {
      return respondError(req, res, 400, "No se creo la solicitud");
    }

    respondSuccess(req, res, 201, newSolicitud);
  } catch (error) {
    handleError(error, "solicitud.controller -> createSolicitud");
    respondError(req, res, 500, "No se creo la solicitud");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUserById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [user, errorUser] = await UserService.getUserById(params.id);

    if (errorUser) return respondError(req, res, 404, errorUser);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateUser(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [user, userError] = await UserService.updateUser(params.id, body);

    if (userError) return respondError(req, res, 400, userError);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

/**
 * Elimina un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteUser(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const user = await UserService.deleteUser(params.id);
    !user
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

module.exports = {
  getSolicitudes,
  createSolicitud,
  getUserById,
  updateUser,
  deleteUser,
};
