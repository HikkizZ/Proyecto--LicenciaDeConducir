"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Solicitud = require("../models/solicitud.model.js");
const { handleError } = require("../utils/errorHandler.js");


// Crea una solicitud para una id de ususario
async function createSolicitud(id) {
  try {
   
    const user = await User.findById({ _id: id });
    if (!user) return [null, "El usuario no existe"];
    
    const newSolicitud = new Solicitud({
      userId: id,
    });
    await newSolicitud.save();

    return [newSolicitud, null];
  } catch (error) {
    handleError(error, "user.solicitud -> createSolicitud");
  }
}

// obtener todas las solicitudes
async function getSolicitudes() {
  try {
    const solicitudes = await Solicitud.find();
    if (!solicitudes) return [null, "No hay solicitudes"];

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
    const user = await User.findById({ _id: id });
    if (!user) return [null, "El usuario no existe"];

    const solicitud = await Solicitud.findOne({ userId: id });

    if (!solicitud) return [null, "El usuario no posee solicitud"];

    return [solicitud, null];
  } catch (error) {
    handleError(error, "solicitud.service -> getSolicitudByUserId");
  }
}


/**
 * Actualiza una solicitud por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateSolicitud(id, user) {
  try {
    const userFound = await User.findById(id);
    if (!userFound) return [null, "El usuario no existe"];

    const { username, email, password, newPassword, roles } = user;

    const matchPassword = await User.comparePassword(
      password,
      userFound.password,
    );

    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const myRole = rolesFound.map((role) => role._id);

    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: await User.encryptPassword(newPassword || password),
        roles: myRole,
      },
      { new: true },
    );

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}


// Elimina una solicitud por su _id
async function deleteSolicitud(id) {
  try {
  
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
  updateSolicitud,
  deleteSolicitud,
};
