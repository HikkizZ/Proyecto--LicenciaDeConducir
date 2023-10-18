const Cita = require('../models/cita.model.js');

// Crear una nueva cita
async function crearCita(req, res) {
    try {
        const nuevaCita = new Cita(req.body);
        await nuevaCita.save();
        res.status(201).send(nuevaCita);
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la cita' });
    }
};

// Obtener todas las citas
async function obtenerCitas(req, res) {
    try {
        const citas = await Cita.find();
        res.send(citas);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener las citas' });
    }
};

// Obtener una cita por ID
async function obtenerCitaPorId(req, res)  {
    try {
        const cita = await Cita.findById(req.params.id);
        if (!cita) {
            return res.status(404).send({ message: 'Cita no encontrada' });
        }
        res.send(cita);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener la cita' });
    }
};

// Actualizar una cita
async function actualizarCita(req, res)  {
    try {
        const citaActualizada = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!citaActualizada) {
            return res.status(404).send({ message: 'Cita no encontrada' });
        }
        res.send(citaActualizada);
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la cita' });
    }
};

// Eliminar una cita
async function eliminarCita(req, res) {
    try {
        const citaEliminada = await Cita.findByIdAndDelete(req.params.id);
        if (!citaEliminada) {
            return res.status(404).send({ message: 'Cita no encontrada' });
        }
        res.send({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar la cita' });
    }
};

module.exports = {
    eliminarCita,
    actualizarCita,
    obtenerCitas,
    obtenerCitaPorId,
    crearCita,
};