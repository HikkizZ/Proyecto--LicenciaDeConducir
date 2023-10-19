/*const mongoose = require("mongoose");

const especialistaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  tipoExamen: {
    type: String,
    enum: ['Teorico', 'Practico', 'Vista', 'Psicotecnico'],
    required: true,
  },
  disponibilidad: [
    {
      dia: {
        type: String,
        enum: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
        //required: true,
      },
      horario: {
        type: String, //debemos ver como hacer para que sea un rango de horas
        //required: true,
      }
    }
  ],
  citasAsignadas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cita",
    }
  ],
}, {
  versionKey: false,
});

const Especialista = mongoose.model("Especialista", especialistaSchema);

module.exports = Especialista;
