const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      geography: Joi.string().required().trim(),
      geography_type: Joi.string().required().trim(),
      house_type: Joi.string(),
      bedroom_type: Joi.number(),
      year: Joi.number(),
      vacancy_rate: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
};
