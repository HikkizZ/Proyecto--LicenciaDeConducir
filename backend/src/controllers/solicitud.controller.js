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

        // Utiliza la función isAdmin en lugar de esAdministrador
        isAdmin(req, res, async function () {
            // Agregar validación para el estado (ejemplo: solo el administrador puede modificar el estado)
            if (body.estado && !isAdmin(req)) {
                return respondError(req, res, 403, "No tienes permiso para modificar el estado");
            }

            // Agregar validación para el plazo de 72 horas (ejemplo)
            const solicitudExistente = await SolicitudServicio.getSolicitudPorId(params.id);
            if (solicitudExistente.estado !== "Pendiente") {
                return respondError(req, res, 403, "No puedes modificar una solicitud que no está pendiente.");
            }

            if (solicitudExistente.fechaInicio.getTime() + 72 * 60 * 60 * 1000 < new Date().getTime()) {
                return respondError(req, res, 403, "Ha pasado más de 72 horas, no puedes modificar la solicitud.");
            }

            const { error: bodyError } = solicitudBodySchema.validate(body);
            if (bodyError) return respondError(req, res, 400, bodyError.message);

            const [solicitud, errorSolicitud] = await SolicitudServicio.updateSolicitud(params.id, body);

            if (errorSolicitud) return respondError(req, res, 400, errorSolicitud);

            respondSuccess(req, res, 200, solicitud);
        });
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


async function getSolicitudById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = userIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [user, errorUser] = await User.findById(params.id);

        if (errorUser) return respondError(req, res, 404, errorUser);

        const [solicitud, errorSolicitud] = await SolicitudService.getSolicitudById(params.id);
        if (errorSolicitud) return respondError(req, res, 404, errorSolicitud);

        respondSuccess(req, res, 200, solicitud);
    } catch (error) {
        handleError(error, "solicitud.controller -> getSolicitudById");
        respondError(req, res, 500, "No se pudo obtener la solicitud");
    }
}


module.exports = {
    getSolicitud,
    updateSolicitud,
    createSolicitud,
    getSolicitudById,
};                      