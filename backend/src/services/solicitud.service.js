// solicitud.service.js
'use strict';

const Solicitud = require('../models/solicitud.model.js');
const { handleError } = require('../utils/errorHandler.js');

async function getSolicitud() {
    try {
        const solicitudes = await Solicitud.find().exec();
        return [solicitudes, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> getSolicitud');
        return [null, error.message];
    }
}

async function updateSolicitud(id, solicitudData) {
    try {
        const solicitud = await Solicitud.findByIdAndUpdate(id, solicitudData, { new: true }).exec();
        if (!solicitud) return [null, 'La solicitud no existe'];
        return [solicitud, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> updateSolicitud');
        return [null, error.message];
    }
}

module.exports = {
    getSolicitud,
    updateSolicitud,
};
