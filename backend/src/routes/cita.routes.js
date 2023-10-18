const express = require('express');
const router = express.Router();
const citaController = require('../controllers/cita.controller.js');


router.post('/', citaController.crearCita);
router.get('/', citaController.obtenerCitas);
router.get('/:id', citaController.obtenerCitaPorId);
router.put('/:id', citaController.actualizarCita);
router.delete('/:id', citaController.eliminarCita);

module.exports = router;
