const Joi = require('joi');

exports.productSchema = Joi.object({

  name: Joi.string().min(3).required(),

  description: Joi.string().required(),

  price: Joi.number().positive().required(),

  stock: Joi.number().integer().min(0).required()

});