const Joi = require('joi');

const solicitudBodySchema = Joi.object({
  idUsuario: Joi.string().required(),
  nombre: Joi.string().required(),
  rut: Joi.string().required(),
  correo: Joi.string().email().required(),
  fechaInicio: Joi.date().required(),
  estado: Joi.string().required(),
});

const solicitudIdSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  solicitudBodySchema,
  solicitudIdSchema,
};
