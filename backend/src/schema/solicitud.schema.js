"use strict";

const Joi = require('joi');

const solicitudBodySchema = Joi.object({
  // Define las propiedades que deseas validar para la solicitud
  idUsuario: Joi.string().required(),
  nombre: Joi.string().required(),
  rut: Joi.string().required(),
  correo: Joi.string().email().required(),
  fechaInicio: Joi.date().required(),
  estado: Joi.string().valid("Pendiente", "Aceptada", "Rechazada", "Fuera de plazo").required(),
});

const solicitudIdSchema = Joi.object({
  // Define la validación para el ID de solicitud
  id: Joi.string().required(),
});

module.exports = {
  solicitudBodySchema,
  solicitudIdSchema,
};
