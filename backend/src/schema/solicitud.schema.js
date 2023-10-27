"use strict";
const Joi = require("joi");

const solicitudBodySchema = Joi.object({
  userId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID del usuario no puede estar vacío.",
      "any.required": "El ID del usuario es obligatorio.",
      "string.base": "El ID del usuario debe ser de tipo string.",
      "string.pattern.base": "El ID proporcionado no es un ObjectId válido.",
    }),
  fechaCreacion: Joi.date()
    .default(Date.now)
    .messages({
      "date.base": "La fecha de creación debe ser de tipo Date.",
    }),
  estado: Joi.string()
    .valid("pendiente", "aprobada", "rechazada", "fuera de plazo")
    .default("pendiente")
    .messages({
      "any.only": "El estado proporcionado no es válido.",
    }),
});

const solicitudIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID de la solicitud no puede estar vacío.",
      "any.required": "El ID de la solicitud es obligatorio.",
      "string.base": "El ID de la solicitud debe ser de tipo string.",
      "string.pattern.base": "El ID proporcionado no es un ObjectId válido.",
    }),
});


module.exports = {solicitudBodySchema,solicitudIdSchema};