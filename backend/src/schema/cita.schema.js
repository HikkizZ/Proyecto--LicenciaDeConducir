"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para la creacion de cita.
 * @constant {Object}
 */
const citaBodySchema = Joi.object({
    fecha: Joi.date().min('now').required().messages({
        "date.base": "La fecha debe ser de tipo date.",
        "date.min": "La fecha no puede ser anterior a la fecha actual.",
        "any.required": "La fecha es obligatoria."
    }),
    hora: Joi.string().required().messages({
        "string.empty": "La hora no puede estar vacía.",
        "any.required": "La hora es obligatoria.",
        "string.base": "La hora debe ser de tipo string."
    }),
    especialistaId: Joi.string().required().messages({
        "string.empty": "El ID del especialista no puede estar vacío.",
        "any.required": "El ID del especialista es obligatorio.",
        "string.base": "El ID del especialista debe ser de tipo string."
    }),
    usuarioId: Joi.string().required().messages({
        "string.empty": "El ID del usuario no puede estar vacío.",
        "any.required": "El ID del usuario es obligatorio.",
        "string.base": "El ID del usuario debe ser de tipo string."
    }),
    estado: Joi.string().valid('Pendiente', 'Confirmada', 'Realizada', 'Cancelada').default('Pendiente').messages({
        "string.base": "El estado debe ser de tipo string.",
        "any.only": "El estado proporcionado no es válido."
    }),
    tipoExamen: Joi.string().valid('Teorico', 'Practico', 'Vista', 'Psicotecnico').required().messages({
        "string.base": "El tipo de examen debe ser de tipo string.",
        "any.required": "El tipo de examen es obligatorio.",
        "any.only": "El tipo de examen proporcionado no es válido."
    })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales."
});

/**
 * Esquema de validación para el id de cita.
 * @constant {Object}
 */
const citaIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido."
        }),
});

const citaUpdateSchema = Joi.object({
    fecha: Joi.date()
        .min(Joi.ref('now'))
        .custom((value, helpers) => {
            const diffDays = (new Date(value) - new Date()) / (1000 * 60 * 60 * 24);
            if (diffDays < 7) {
                return helpers.message('La fecha de reprogramación debe ser al menos una semana antes de la fecha actual.');
            }
            return value;
        })
        .required(),
    // ... (resto del esquema sin cambios)
});

module.exports = { citaBodySchema, citaIdSchema, citaUpdateSchema };
