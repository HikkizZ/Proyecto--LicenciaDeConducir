'use strict';

const express = require('express');
const solicitudController = require('../controllers/solicitud.controller.js');
const router = express.Router();
const { isAdmin } = require('../middlewares/authorization.middleware'); // Importa el middleware isAdmin

// Ruta para obtener una solicitud por su ID
router.get('/', solicitudController.getSolicitud);

// Ruta para actualizar una solicitud por su ID
router.put('/:id', isAdmin, solicitudController.updateSolicitud); // Aplica el middleware isAdmin aquí

// Ruta para crear una nueva solicitud
router.post('/', solicitudController.createSolicitud);

module.exports = router;
