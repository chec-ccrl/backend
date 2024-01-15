const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      ca: Joi.string().required().trim(),
      cma: Joi.string().required().trim(),
      year: Joi.number(),
      cost: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      ca: Joi.string().required().trim(),
      cma: Joi.string().required().trim(),
      year: Joi.number(),
      cost: Joi.number(),
    });
    return Joi.validate(Obj, schema);
  },
};
