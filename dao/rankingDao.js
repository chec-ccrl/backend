const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");
module.exports = {
  createProvince: async (rankingObj, transaction) => {
    try {
      const province = await db.rentalRankingProvince.create(
        {
          id: Common.helper.generateId(),
          ...rankingObj,
        },
        { transaction }
      );
      return province.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  createCma: async (rankingObj, transaction) => {
    try {
      const cma = await db.rentalRankingCma.create(
        {
          id: Common.helper.generateId(),
          ...rankingObj,
        },
        { transaction }
      );
      return cma.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  createCa: async (rankingObj, transaction) => {
    try {
      const ca = await db.rentalRankingCa.create(
        {
          id: Common.helper.generateId(),
          ...rankingObj,
        },
        { transaction }
      );
      return ca.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAllProvinces: async () => {
    try {
      const result = await db.rentalRankingProvince.findAll({});
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
};
