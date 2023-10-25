const express = require('express');
const router = express.Router();
const citaController = require('../controllers/cita.controller.js');
const authMiddleware = require('../middlewares/authorization.middleware');
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

router.use(authenticationMiddleware);
router.post('/', citaController.crearCita);
router.get('/', authMiddleware.isEspecialista, citaController.obtenerCitas);
router.get('/especialista/:id', authMiddleware.isEspecialista, citaController.obtenerCitasEspecialista);
router.get('/usuario/:id', authMiddleware.isEspecialista, citaController.obtenerCitasUsuario);
router.get('/:id', authMiddleware.isEspecialista, citaController.obtenerCitaPorId);
router.put('/:id', authMiddleware.isEspecialista, citaController.actualizarCita);
router.delete('/:id', authMiddleware.isEspecialista, citaController.eliminarCita);

module.exports = router;
