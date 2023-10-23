'use strict';

const express = require('express');
const solicitudController = require('../controllers/solicitud.controller.js');
const router = express.Router();

// Ruta para obtener una solicitud por su ID
router.get('/', solicitudController.getSolicitud);

// Ruta para actualizar una solicitud por su ID
router.put('/:id', solicitudController.updateSolicitud);

module.exports = router;
