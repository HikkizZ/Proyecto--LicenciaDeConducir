// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const solicitudController = require("../controllers/solicitud.controller");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para las solicitudes
router.post("/:id", solicitudController.createSolicitud);
router.get("/", solicitudController.getSolicitudes);
router.get("/:id", solicitudController.getSolicitudByUserId);
router.delete("/:id", solicitudController.deleteSolicitud);


// Exporta el enrutador
module.exports = router;