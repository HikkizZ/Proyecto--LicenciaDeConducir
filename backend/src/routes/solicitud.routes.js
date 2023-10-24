// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const solicitudController = require("../controllers/solicitud.controller");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para la autenticación
router.get("/", solicitudController.getSolicitudes);
router.post("/", solicitudController.createSolicitud);

// Exporta el enrutador
module.exports = router;