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
  getAll: async (rentObj, transaction) => {
    try {
      let query = {
        where: rentObj,
        transaction,
      };
      const result = await db.rent.findAll(query);
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
};
