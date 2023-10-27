// Esquema del modelo de documentos o archivos
"use strict";
const Joi = require("joi");

const documentBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    filename: Joi.string().required().messages({
        "string.empty": "El nombre del archivo no puede estar vacío.",
        "any.required": "El nombre del archivo es obligatorio.",
        "string.base": "El nombre del archivo debe ser de tipo string.",
    }),
    url: Joi.string().required().messages({
        "string.empty": "La URL no puede estar vacía.",
        "any.required": "La URL es obligatoria.",
        "string.base": "La URL debe ser de tipo string.",
    }),
    usuarioId: Joi.string().required().messages({
        "string.empty": "El ID del usuario no puede estar vacío.",
        "any.required": "El ID del usuario es obligatorio.",
        "string.base": "El ID del usuario debe ser de tipo string.",
    }),
    estado: Joi.string()
        .valid("pendiente", "aprobado", "rechazado")
        .default("pendiente")
        .messages({
            "any.only": "No valido",
        }),
}).messages({
    "object.unknown": "No se permiten propiedades no asigadas previamente.",
});

/**
 * Esquema de validación para el id de documento.
 */

const documentIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
        }),
});

const documentUpdateSchema = Joi.object({
    estado: Joi.string()
        .valid("pendiente", "aprobado", "rechazado")
        .default("pendiente")
        .messages({
            "any.only": "No valido",
        }),
});

module.exports = { documentBodySchema, documentIdSchema, documentUpdateSchema };
