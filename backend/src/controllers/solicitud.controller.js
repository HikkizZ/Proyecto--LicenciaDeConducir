"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

const UserService = require("../services/user.service");
const SolicitudService = require("../services/solicitud.service");


const { userBodySchema, userIdSchema } = require("../schema/user.schema");
const { solicitudBodySchema, solicitudIdSchema } = require("../schema/solicitud.schema.js");






// crear solicitud por id de usuario
async function createSolicitud(req, res) {
    try {
        const { body } = req;

        const [newSolicitud, solicitudError] = await SolicitudService.createSolicitud(body.userId);

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

        solicitudes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, solicitudes);
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

        const [user, errorUser] = await UserService.getUserById(params.id);

        if (errorUser) return respondError(req, res, 404, errorUser);

        const [solicitud, errorSolicitud] = await SolicitudService.getSolicitudByUserId(params.id);
        if (errorSolicitud) return respondError(req, res, 404, errorSolicitud);

        respondSuccess(req, res, 200, solicitud);
    } catch (error) {
        handleError(error, "solicitud.controller -> getSolicitudByUserId");
        respondError(req, res, 500, "No se pudo obtener la solicitud");
    }
}

/**
 * Actualiza una solicitud por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateSolicitud(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = solicitudIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = solicitudBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [solicitud, errorSolicitud] = await SolicitudServicio.updateSolicitud(params.id, body);

        if (errorSolicitud) return respondError(req, res, 400, errorSolicitud);

        respondSuccess(req, res, 200, solicitud);
    } catch (error) {
        handleError(error, 'solicitud.controller -> updateSolicitud');
        respondError(req, res, 500, 'No se pudo actualizar la solicitud');
    }
};

// Elimina una solicitud por su _id
async function deleteSolicitud(req, res) {
    try {

        const { params } = req;
        console.log("el params.id:", params.id);
        const [solicitud, errorSolicitud] = await SolicitudService.deleteSolicitud(params.id);
        if (errorSolicitud) return respondError(req, res, 404, errorSolicitud);

        solicitud.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, solicitud);

    } catch (error) {
        handleError(error, "solocitud.controller -> deleteSolicitud");
        respondError(req, res, 500, "No se pudo eliminar la solicitud");
    }
}

module.exports = {
    getSolicitudes,
    createSolicitud,
    getSolicitudByUserId,
    deleteSolicitud,
    updateSolicitud,
};