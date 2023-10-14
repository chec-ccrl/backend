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
};
