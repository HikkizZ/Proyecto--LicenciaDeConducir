"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Instancia del enrutador */
const router = express.Router();

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Enrutadores de la API */
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const solicitudRoutes = require("./solicitud.routes.js");


// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para las solicitudes /api/solicitud
router.use("/solicitud", solicitudRoutes);


// Exporta el enrutador
module.exports = router;
