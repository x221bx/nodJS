const Joi = require('joi');

const create = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(200).required(),
    price: Joi.number().precision(2).min(0).required(),
    description: Joi.string().allow('').max(1000).optional(),
    categoryId: Joi.string().trim().optional(),
  }),
};

module.exports = { create };

