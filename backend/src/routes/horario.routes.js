"use strict";
const express = require("express");

const horarioController = require("../controllers/horario.controller.js");
const authMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();


// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

//Define las rutas para los horarios
router.get("/", horarioController.getHorarios);
router.get("/:horarioId", horarioController.getHorarioById);
router.put("/:horarioId",horarioController.updateHorarioById);

//rutas que necesitan autenticacion y autorizacion de especialista

router.post("/",authMiddleware.isEspecialista, horarioController.createHorario);
router.delete("/:horarioId",authMiddleware.isEspecialista, horarioController.deleteHorarioById);



/**
*router.post("/",authMiddleware.isEspecialista, horarioController.createHorario);
*router.delete("/:horarioId",authMiddleware.isEspecialista,horarioController.deleteHorarioById);
*/


module.exports = router;