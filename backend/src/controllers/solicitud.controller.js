"use strict"

const { respondSuccess, respondError } = require("../utils/resHandler.js");
const SolicitudServicio = require("../services/solicitud.service.js");
const { handleError } = require("../utils/errorHandler.js");
// Importa los esquemas de solicitud desde solicitud.schema.js
const { solicitudBodySchema, solicitudIdSchema } = require("../schema/solicitud.schema.js");

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
}
/**
 * Obtiene a todas las solicitudes
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function getSolicitud(req, res) {
    try {
        // Aquí puedes validar si es necesario, dependiendo de tu lógica, 
        // pero si no es necesario, puedes omitir esta validación.
        const { error: bodyError } = solicitudBodySchema.validate(req.body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [solicitud, error] = await SolicitudServicio.getSolicitud();
        if (error) return respondError(req, res, 404, error);

        if (solicitud.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, solicitud);
        }
    } catch (error) {
        handleError(error, "solicitud.controller -> getSolicitud");
    }
};

/**
 * Crea una nueva solicitud
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function createSolicitud(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = solicitudBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newSolicitud, errorSolicitud] = await SolicitudServicio.createSolicitud(body);

        if (errorSolicitud) return respondError(req, res, 400, errorSolicitud);
        if (!newSolicitud) {
            return respondError(req, res, 400, "No se creó la solicitud");
        }

        respondSuccess(req, res, 201, newSolicitud);
    } catch (error) {
        handleError(error, "solicitud.controller -> createSolicitud");
        respondError(req, res, 500, "No se creó la solicitud");
    }
};



module.exports = {
    getSolicitud,
    updateSolicitud,
    createSolicitud,
};                      