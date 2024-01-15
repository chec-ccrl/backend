const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      ranking_before_tax: Joi.number(),
      ranking_after_tax: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      ranking_before_tax: Joi.number(),
      ranking_after_tax: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
};
