const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      cma: Joi.string().required().trim(),
      income_bracket: Joi.string().required().trim(),
      year: Joi.number(),
      total_income: Joi.number(),
      after_tax_income: Joi.number(),
      number_of_family: Joi.number(),
      median_before_tax: Joi.number(),
      median_after_tax: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      cma: Joi.string().required().trim(),
      income_bracket: Joi.string().required().trim(),
      year: Joi.number(),
      total_income: Joi.number(),
      after_tax_income: Joi.number(),
      number_of_family: Joi.number(),
      median_before_tax: Joi.number(),
      median_after_tax: Joi.number(),
    });
    return Joi.validate(Obj, schema);
  },
};
