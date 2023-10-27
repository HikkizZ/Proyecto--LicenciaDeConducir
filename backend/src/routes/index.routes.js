"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");
/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

/** Enrutadores de la API */
const solocitudRoutes = require("./solicitud.routes.js");
const citaRoutes = require("./cita.routes.js");

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas para las solicitudes /api/solicitud
router.use("/solicitud", solocitudRoutes);
//Define las rutas para los especialistas /api/especialistas
router.use("/citas", citaRoutes);

// Exporta el enrutador
module.exports = router;
