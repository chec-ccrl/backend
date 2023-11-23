const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (multiplierObj, transaction) => {
    try {
      const multiplier = await db.multiplier.create(
        {
          id: Common.helper.generateId(),
          ...multiplierObj,
        },
        { transaction }
      );
      return multiplier.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (multiplierObj, transaction) => {
    try {
      const result = await db.multiplier.findAll({});
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (multiplierDao, transaction) => {
    try {
      const result = await db.multiplier.destroy(
        { where: multiplierDao },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (multiplierObj, transaction) => {
    try {
      const updated = await db.multiplier.update(
        multiplierObj,
        { where: { id: multiplierObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (multiplierObj, transaction) => {
    try {
      const result = await db.multiplier.findOne({ where: multiplierObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
};
