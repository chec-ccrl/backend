const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      geography: Joi.string().required().trim(),
      geography_type: Joi.string().required().trim(),
      house_type: Joi.string(),
      year: Joi.number(),
      rent_value: Joi.number(),
      bedroom_type: Joi.string(),
    });

    return Joi.validate(Obj, schema);
  },
};
