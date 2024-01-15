const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      cma: Joi.string(),
      ca: Joi.string(),
      house_type: Joi.string(),
      bedroom_type: Joi.string(),
      year: Joi.number(),
      vacancy_rate: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      cma: Joi.string(),
      ca: Joi.string(),
      house_type: Joi.string(),
      bedroom_type: Joi.string(),
      year: Joi.number(),
      vacancy_rate: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
};
