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
  getAll: async (householdObj, transaction) => {
    try {
      let query = {
        where: {},
        limit: completeHousingObj.limit ?? 25,
        offset: completeHousingObj.offset ?? 0,
        transaction,
      };
      const result = await db.householdIncome.findAll(query);
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
};
