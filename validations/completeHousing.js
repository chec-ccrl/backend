const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      geography: Joi.string().required().trim(),
      geography_type: Joi.string().required().trim(),
      intended_market: Joi.string(),
      housing_type: Joi.string(),
      year: Joi.number(),
      units: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      geography: Joi.string().required().trim(),
      geography_type: Joi.string().required().trim(),
      intended_market: Joi.string(),
      housing_type: Joi.string(),
      year: Joi.number(),
      units: Joi.number(),
    });
    return Joi.validate(Obj, schema);
  },
};
