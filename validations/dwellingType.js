const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      census_subdivision: Joi.string().required().trim(),
      CMA_CA_mapping: Joi.string(),
      CMA: Joi.string(),
      CA: Joi.string(),
      intended_market: Joi.string(),
      year: Joi.number(),
      bedroom_type: Joi.string(),
      apartment: Joi.number(),
      row_house: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      province: Joi.string().required().trim(),
      census_subdivision: Joi.string().required().trim(),
      CMA_CA_mapping: Joi.string(),
      CMA: Joi.string(),
      CA: Joi.string(),
      intended_market: Joi.string(),
      year: Joi.number(),
      bedroom_type: Joi.string(),
      apartment: Joi.number(),
      row_house: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
};
