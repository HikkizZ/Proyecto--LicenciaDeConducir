"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Solicitud = require("../models/solicitud.model.js");
const { handleError } = require("../utils/errorHandler.js");


async function getSolicitudes() {
  try {
    const solicitudes = await Solicitud.find();
    if (!solicitudes) return [null, "No hay solicitudes"];

    return [solicitudes, null];
  } catch (error) {
    handleError(error, "solicitudes.service -> getSolicitudes");
  }
}

// Crea una solicitud 
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

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserById(id) {
  try {
    const user = await User.findById({ _id: id })
      .select("-password")
      .populate("roles")
      .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateUser(id, user) {
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

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

module.exports = {
  getSolicitudes,
  createSolicitud,
  getUserById,
  updateUser,
  deleteUser,
};
