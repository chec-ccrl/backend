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
};
