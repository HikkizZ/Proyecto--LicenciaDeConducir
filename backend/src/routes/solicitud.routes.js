// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const solicitudController = require("../controllers/solicitud.controller");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las solicitudes
router.post("/:id", solicitudController.createSolicitud);
router.get("/", solicitudController.getSolicitudes);
router.get("/:id", solicitudController.getSolicitudByUserId);
router.delete("/:id",authorizationMiddleware.isAdmin ,solicitudController.deleteSolicitud);
router.put("/:id",authorizationMiddleware.isAdmin ,solicitudController.updateSolicitud);



// Exporta el enrutador
module.exports = router;