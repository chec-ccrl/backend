const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");

module.exports = {
  create: async (householdObj, transaction) => {
    try {
      const householdIncome = await db.householdIncome.create(
        {
          id: Common.helper.generateId(),
          ...householdObj,
        },
        { transaction }
      );
      return householdIncome.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
};
