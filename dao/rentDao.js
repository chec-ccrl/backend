const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");

module.exports = {
  create: async (rentObj, transaction) => {
    try {
      const rent = await db.rent.create(
        {
          id: Common.helper.generateId(),
          ...rentObj,
        },
        { transaction }
      );
      return rent.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
};
