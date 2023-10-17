const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");

module.exports = {
  create: async (dwellingObj, transaction) => {
    try {
      const dwellingType = await db.dwellingType.create(
        {
          id: Common.helper.generateId(),
          ...dwellingObj,
        },
        { transaction }
      );
      return dwellingType.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (dwellingObj, transaction) => {
    try {
      let query = {
        where: {},
        limit: completeHousingObj.limit ?? 25,
        offset: completeHousingObj.offset ?? 0,
        transaction,
      };
      const result = await db.dwellingType.findAll(query);
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
};
