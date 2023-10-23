// solicitud.controller.js
'use strict';

const { respondSuccess, respondError } = require('../utils/resHandler.js');
const SolicitudServicio = require('../services/solicitud.service.js');
const { solicitudBodySchema, solicitudIdSchema } = require('../schema/solicitud.schema.js');
const { handleError } = require('../utils/errorHandler.js');

async function getSolicitud(req, res) {
    try {
        const [solicitudes, error] = await SolicitudServicio.getSolicitud();
        if (error) return respondError(req, res, 404, error);

        if (!solicitudes || solicitudes.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, solicitudes);
        }
    } catch (error) {
        handleError(error, 'solicitud.controller -> getSolicitud');
        respondError(req, res, 500, 'Error interno del servidor');
    }
}

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
        respondError(req, res, 500, 'Error interno del servidor');
    }
}

module.exports = {
    getSolicitud,
    updateSolicitud,
};
