"use strict";
const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controller.js");
const authMiddleware = require("../middlewares/authorization.middleware");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");


//Define las rutas para los horarios
router.post("/", horarioController.createHorario);
router.get("/", horarioController.getHorarios);
router.get("/:horarioId", horarioController.getHorarioById);
router.put("/:horarioId",horarioController.updateHorarioById);
router.delete("/:horarioId",horarioController.deleteHorarioById);



module.exports = router;