const express = require('express');
const router = express.Router();
const citaController = require('../controllers/cita.controller.js');
const authMiddleware = require('../middlewares/authorization.middleware');

router.post('/', citaController.crearCita);
router.get('/', citaController.obtenerCitas);
router.get('/:id', citaController.obtenerCitaPorId);
router.put('/:id', authMiddleware.isEspecialista, citaController.actualizarCita);
router.delete('/:id', authMiddleware.isEspecialista, citaController.eliminarCita);

module.exports = router;
