"use strict";

const Joi = require('joi');

const solicitudBodySchema = Joi.object({
  // Define las propiedades que deseas validar para la solicitud
  idUsuario: Joi.string(),
  nombre: Joi.string(),
  rut: Joi.string(),
  correo: Joi.string().email(),
  fechaInicio: Joi.date(),
  estado: Joi.string(),
});

const solicitudIdSchema = Joi.object({
  // Define la validación para el ID de solicitud
  id: Joi.string().required(),
});

module.exports = {
  solicitudBodySchema,
  solicitudIdSchema,
};
