/*"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const EspecialistaService = require("../services/especialista.service");
const { handleError } = require("../utils/errorHandler");

async function getEspecialista(req, res) {
    try {
        const [especialistas, errorEspecialistas] = await EspecialistaService.getEspecialistas();
        if (errorEspecialistas) return respondError(req, res, 404, errorEspecialistas);

        especialistas.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, especialistas);
    } catch (error) {
        handleError(error, "especialista.controller -> getEspecialistas");
    }
}

async function createEspecialista(req, res) {
    try {
        const [newEspecialista, errorNewEspecialista] = await EspecialistaService.createEspecialista(req.body);
        if (errorNewEspecialista) return respondError(req, res, 400, errorNewEspecialista);

        respondSuccess(req, res, 201, newEspecialista);
    } catch (error) {
        handleError(error, "especialista.controller -> createEspecialista");
    }
}

module.exports = {
    getEspecialista,
    createEspecialista,
};
