const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      ca: Joi.string().trim(),
      cma: Joi.string().trim(),
      intended_market: Joi.string(),
      house_type: Joi.string(),
      year: Joi.number(),
      units: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      ca: Joi.string().trim(),
      cma: Joi.string().trim(),
      intended_market: Joi.string(),
      house_type: Joi.string(),
      year: Joi.number(),
      units: Joi.number(),
    });
    return Joi.validate(Obj, schema);
  },
};
