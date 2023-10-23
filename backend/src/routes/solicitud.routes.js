// solicitud.routes.js
'use strict';

const express = require('express');
const solicitudController = require('../controllers/solicitud.controller.js');
const router = express.Router();

// Ruta para crear una solicitud
router.post('/', solicitudController.createSolicitud);

// Ruta para obtener todas las solicitudes
router.get('/', solicitudController.getSolicitudes);

// Ruta para obtener una solicitud por su ID
router.get('/:id', solicitudController.getSolicitudById);

// Ruta para actualizar una solicitud por su ID
router.put('/:id', solicitudController.updateSolicitud);

// Ruta para eliminar una solicitud por su ID
router.delete('/:id', solicitudController.deleteSolicitud);

module.exports = router;
