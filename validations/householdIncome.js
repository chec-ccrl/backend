const Joi = require("joi");
module.exports = {
  createValidation: (Obj) => {
    const schema = Joi.object().keys({
      Province: Joi.string().required().trim(),
      CSD: Joi.string(),
      CMA: Joi.string(),
      CMA_CA_mapping: Joi.string(),
      CA: Joi.string(),
      house_type: Joi.string(),
      median_after_tax: Joi.boolean(),
      median_before_tax: Joi.boolean(),
      year: Joi.number(),
      household_including_census_family: Joi.number(),
      census_family_household: Joi.number(),
      household_only_one_census_family_without_additional_person: Joi.number(),
      one_couple_with_or_without_child: Joi.number(),
      without_child: Joi.number(),
      with_child: Joi.number(),
      one_parent: Joi.number(),
      one_parent_man: Joi.number(),
      one_parent_women: Joi.number(),
      other_census_family: Joi.number(),
      non_census_family: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
  updateValidation: (Obj) => {
    const schema = Joi.object().keys({
      Province: Joi.string().required().trim(),
      CSD: Joi.string(),
      CMA: Joi.string(),
      CMA_CA_mapping: Joi.string(),
      CA: Joi.string(),
      house_type: Joi.string(),
      median_after_tax: Joi.boolean(),
      median_before_tax: Joi.boolean(),
      year: Joi.number(),
      household_including_census_family: Joi.number(),
      census_family_household: Joi.number(),
      household_only_one_census_family_without_additional_person: Joi.number(),
      one_couple_with_or_without_child: Joi.number(),
      without_child: Joi.number(),
      with_child: Joi.number(),
      one_parent: Joi.number(),
      one_parent_man: Joi.number(),
      one_parent_women: Joi.number(),
      other_census_family: Joi.number(),
      non_census_family: Joi.number(),
    });

    return Joi.validate(Obj, schema);
  },
};
