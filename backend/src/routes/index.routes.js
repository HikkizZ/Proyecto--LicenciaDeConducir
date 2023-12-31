"use strict";


// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de citas */
const citaRoutes = require("./cita.routes.js");

/** Enrutador de documentos */
const documentRoutes = require("./document.routes.js");

/** Enrutador de solicitudes */
const solicitudRoutes = require("./solicitud.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();


// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los especialistas /api/especialistas
router.use("/citas", citaRoutes);
// Define las rutas para los documentos /api/documentos
router.use("/documents", documentRoutes);
// Define las rutas para las solicitudes /api/solicitud
router.use("/solicitud", solicitudRoutes);

// Exporta el enrutador
module.exports = router;