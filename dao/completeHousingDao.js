const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");

module.exports = {
  create: async (completeHousingObj, transaction) => {
    try {
      const completeHousing = await db.completeHousing.create(
        {
          id: Common.helper.generateId(),
          ...completeHousingObj,
        },
        { transaction }
      );
      return completeHousing.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (completeHousingObj, transaction) => {
    try {
      let query = {
        where: {},
        limit: completeHousingObj.limit ?? 25,
        offset: completeHousingObj.offset ?? 0,
        transaction,
      };

      const result = await db.completeHousing.findAll(query);
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
};
