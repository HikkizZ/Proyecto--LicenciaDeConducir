// solicitud.controller.js
'use strict';

const { respondSuccess, respondError } = require('../utils/resHandler.js');
const Solicitud = require('../models/solicitud.model.js');
const { handleError } = require('../utils/errorHandler.js');
const { solicitudBodySchema, solicitudIdSchema } = require('../schema/solicitud.schema.js'); // Importa los esquemas de validación


async function createSolicitud(solicitud) {
    try {
        const newSolicitud = new Solicitud(solicitud);
        const createdSolicitud = await newSolicitud.save();
        return [createdSolicitud, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> createSolicitud');
        return [null, error.message];
    }
}

async function getSolicitudes() {
    try {
        const solicitudes = await Solicitud.find().exec();
        return [solicitudes, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> getSolicitudes');
        return [null, error.message];
    }
}

async function getSolicitudById(id) {
    try {
        const solicitud = await Solicitud.findById(id).exec();
        if (!solicitud) return [null, 'Solicitud no encontrada'];
        return [solicitud, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> getSolicitudById');
        return [null, error.message];
    }
}

async function updateSolicitud(id, solicitudData) {
    try {
        const solicitud = await Solicitud.findByIdAndUpdate(id, solicitudData, { new: true }).exec();
        if (!solicitud) return [null, 'Solicitud no encontrada'];
        return [solicitud, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> updateSolicitud');
        return [null, error.message];
    }
}

async function deleteSolicitud(id) {
    try {
        const solicitud = await Solicitud.findByIdAndDelete(id).exec();
        if (!solicitud) return [null, 'Solicitud no encontrada'];
        return [solicitud, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> deleteSolicitud');
        return [null, error.message];
    }
}

module.exports = {
    createSolicitud,
    getSolicitudes,
    getSolicitudById,
    updateSolicitud,
    deleteSolicitud,
};