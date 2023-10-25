const Cita = require('../models/cita.model.js');
const { citaBodySchema, citaIdSchema, citaUpdateSchema } = require('../schema/cita.schema');


// Crear una nueva cita
async function crearCita(req, res) {
    const { error } = citaBodySchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

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

// Obtener una cita por ID de cita
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


//Obtener todas las citas de un especialista específico
async function obtenerCitasEspecialista(req, res) {
    try {
        const especialistaId = req.params.id;
        let citas;
        if (especialistaId) {
            citas = await Cita.find({ especialistaId: especialistaId });
        } else {
            citas = await Cita.find();
        }
        res.send(citas);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener las citas' });
    }
};

// Obtener todas las citas de un usuario específico
async function obtenerCitasUsuario(req, res) {
    try {
        const usuarioId = req.params.id;
        let citas;
        if (usuarioId) {
            citas = await Cita.find({ usuarioId: usuarioId });
        } else {
            citas = await Cita.find();
        }
        res.send(citas);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener las citas del usuario' });
    }
};


// Actualizar una cita
async function actualizarCita(req, res) {
    const { error } = citaUpdateSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const cita = await Cita.findById(req.params.id);
        if (!cita) {
            return res.status(404).send({ message: 'Cita no encontrada' });
        }

        // Verificar si el especialista autenticado es el mismo que está asociado a la cita
        if (cita.especialistaId.toString() !== req.especialistaId.toString()) {
            return res.status(403).send({ message: 'No tienes permiso para actualizar esta cita' });
        }

        const citaActualizada = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(citaActualizada);
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la cita' });
    }
};

// Eliminar una cita
async function eliminarCita(req, res) {
    try {
        const cita = await Cita.findById(req.params.id);
        if (!cita) {
            return res.status(404).send({ message: 'Cita no encontrada' });
        }

        // Verificar si el especialista autenticado es el mismo que está asociado a la cita
        if (cita.especialistaId.toString() !== req.especialistaId.toString()) {
            return res.status(403).send({ message: 'No tienes permiso para eliminar esta cita' });
        }

        await Cita.findByIdAndDelete(req.params.id);
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
    obtenerCitasEspecialista,
    obtenerCitasUsuario,
    crearCita,
};