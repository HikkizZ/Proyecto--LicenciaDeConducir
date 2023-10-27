"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Solicitud = require("../models/solicitud.model.js");
const { handleError } = require("../utils/errorHandler.js");


// Crea una solicitud para una id de ususario
async function createSolicitud(id) {
  try {

    //verificar que el usuario existe
    const user = await User.findById({ _id: id });
    if (!user) return [null, "Error, El usuario no existe"];

    // Comprobar si usuario tiene solicitudes existentes.
    const solicitudFound = await Solicitud.findOne({userId: id});
    if (solicitudFound) return [null, "Error, Ya existe una solicitud"]
    
    const newSolicitud = new Solicitud({
      userId: id,
    });
    await newSolicitud.save();

    return [newSolicitud, null];
  } catch (error) {
    handleError(error, "solicitud.service -> createSolicitud");
  }
}


// obtener todas las solicitudes
async function getSolicitudes() {
  try {
    const solicitudes = await Solicitud.find();
    if (solicitudes.length === 0) return [null, "No hay solicitudes"];

    return [solicitudes, null];
  } catch (error) {
    handleError(error, "solicitud.service -> getSolicitudes");
  }
}


//  obtener solicitudes por _id
async function getSolicitudById(id) {
  try {
    const solicitud = await Solicitud.findById({ _id: id });

    if (!solicitud) return [null, "La solicitud no existe"];

    return [solicitud, null];
  } catch (error) {
    handleError(error, "solicitud.service -> getSolicitudById");
  }
}


//  obtener solicitud por id de ususario (userId)
async function getSolicitudByUserId(id) {
  try {

    //verificar que el usuario existe
    const user = await User.findById({ _id: id });
    if (!user) return [null, "Error, El usuario no existe"];

    const solicitud = await Solicitud.findOne({ userId: id });
    if (!solicitud) return [null, "El usuario no posee solicitud"];

    return [solicitud, null];
  } catch (error) {
    handleError(error, "solicitud.service -> getSolicitudByUserId");
  }
}


// Elimina una solicitud por su _id
async function deleteSolicitud(id) {
  try {
  
    // Comprobar si la solicitud existe
    const solicitudFound = await Solicitud.findOne({_id: id});
    if (!solicitudFound) return [null, "Error, La solicitud no existe"]

    const solicitud = await Solicitud.findByIdAndDelete(id);
    return [solicitud];

  } catch (error) {
    handleError(error, "solicitud.service -> deleteSolicitud");
  }
}

module.exports = {
  createSolicitud,
  getSolicitudes,
  getSolicitudById,
  getSolicitudByUserId,
  deleteSolicitud,
};
