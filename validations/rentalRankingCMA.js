const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      cma: Joi.string().required().trim(),
      ranking: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      cma: Joi.string().required().trim(),
      ranking: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
};
