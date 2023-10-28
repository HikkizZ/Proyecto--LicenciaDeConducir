"use strict";
const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controller.js");
const authMiddleware = require("../middlewares/authorization.middleware");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");


//Define las rutas para los horarios

router.get("/", horarioController.getHorarios);
router.use(authenticationMiddleware);
router.post("/",authMiddleware.isEspecialista, horarioController.createHorario);

module.exports = router;