const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");

module.exports = {
  create: async (vacancyObj, transaction) => {
    try {
      const vacancyRate = await db.vacancyRate.create(
        {
          id: Common.helper.generateId(),
          ...vacancyObj,
        },
        { transaction }
      );
      return vacancyRate.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (vacancyObj, transaction) => {
    try {
      let query = {
        where: vacancyObj,
        transaction,
      };
      const result = await db.vacancyRate.findAll(query);
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
};
