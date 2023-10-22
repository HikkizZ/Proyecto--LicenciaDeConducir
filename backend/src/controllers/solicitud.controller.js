"use strict"

const { respondSuccess, respondError } = require("../utils/resHandler.js");
const SolicitudServicio = require("../services/solicitud.service.js");
const { handleError } = require("../utils/errorHandler.js");


async function getSolicitud(req, res) {
    try {
        const [solicitud, error] = await SolicitudServicio.getSolicitud();
        if (error) return respondError(req, res, 404, error);

        if (solicitud.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, solicitud);
        }


    } catch (error) {
        handleError(error, "product.controller -> getProduct");
    }
};

module.exports = {
    getProducts,
};