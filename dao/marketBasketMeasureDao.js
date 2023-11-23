const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (marketObj, transaction) => {
    try {
      const marketBasketMeasure = await db.marketBasketMeasure.create(
        {
          id: Common.helper.generateId(),
          ...marketObj,
        },
        { transaction }
      );
      return marketBasketMeasure.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (marketObj, transaction) => {
    try {
      const result = await db.marketBasketMeasure.findAll({});
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (multiplierDao, transaction) => {
    try {
      const result = await db.marketBasketMeasure.destroy(
        { where: multiplierDao },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (marketObj, transaction) => {
    try {
      const updated = await db.marketBasketMeasure.update(
        marketObj,
        { where: { id: marketObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (marketObj, transaction) => {
    try {
      const result = await db.marketBasketMeasure.findOne({ where: marketObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
};
