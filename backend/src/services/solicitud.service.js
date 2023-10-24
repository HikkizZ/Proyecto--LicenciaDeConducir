// solicitud.service.js
'use strict';

const Solicitud = require('../models/solicitud.model.js');
const { handleError } = require('../utils/errorHandler.js');

async function getSolicitud() {
    try {
        const solicitudes = await Solicitud.find().exec();
        return [solicitudes, null];
    } catch (error) {
        handleError(error, 'solicitud.service -> getSolicitud');
        return [null, error.message];
    }
};



async function updateSolicitud(id, solicitudData, isAdmin) {
  try {
      const solicitud = await Solicitud.findById(id);

      if (!solicitud) {
          return [null, 'La solicitud no existe'];
      }

      // Verificar si el usuario es administrador y si ha pasado menos de 72 horas
      if (!isAdmin) {
          if (solicitud.estado !== "Pendiente") {
              return [null, 'No puedes modificar una solicitud que no está pendiente.'];
          }

          const tiempoTranscurrido = new Date() - solicitud.fechaInicio;
          if (tiempoTranscurrido > 72 * 60 * 60 * 1000) {
              return [null, 'Ha pasado más de 72 horas, no puedes modificar la solicitud.'];
          }
      }

      // Realizar la actualización de la solicitud
      const updatedSolicitud = await Solicitud.findByIdAndUpdate(id, solicitudData, { new: true }).exec();
      
      return [updatedSolicitud, null];
  } catch (error) {
      handleError(error, 'solicitud.service -> updateSolicitud');
      return [null, error.message];
  }
}




/**
 * Crea una nueva solicitud en la base de datos
 * @param {Object} solicitudData Datos de la solicitud
 * @returns {Promise} Promesa con el objeto de solicitud creado
 */
async function createSolicitud(solicitudData) {
    try {
      const { IdUsuario, nombre, rut, correo, fechaInicio, estado } = solicitudData;
  
      // Verificar si el usuario (IdUsuario) existe en la base de datos
      // Puedes agregar esta verificación si es necesario
  
      // Crear una nueva solicitud
      const nuevaSolicitud = new Solicitud({
        IdUsuario,
        nombre,
        rut,
        correo,
        fechaInicio,
        estado,
      });
  
      // Guardar la nueva solicitud en la base de datos
      const solicitudGuardada = await nuevaSolicitud.save();
  
      return [solicitudGuardada, null];
    } catch (error) {
      handleError(error, "solicitud.service -> createSolicitud");
      return [null, error.message];
    }
  }
  


module.exports = {
    getSolicitud,
    updateSolicitud,
    createSolicitud,
};
