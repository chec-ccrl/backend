const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (spendingObj, transaction) => {
    try {
      const householdSpend = await db.householdSpend.create(
        {
          id: Common.helper.generateId(),
          ...spendingObj,
        },
        { transaction }
      );
      return householdSpend.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (spendingObj, transaction) => {
    try {
      const result = await db.householdSpend.findAll({});
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (spendingObj, transaction) => {
    try {
      const result = await db.householdSpend.destroy(
        { where: spendingObj },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (spendingObj, transaction) => {
    try {
      const updated = await db.householdSpend.update(
        spendingObj,
        { where: { id: spendingObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (spendingObj, transaction) => {
    try {
      const result = await db.householdSpend.findOne({ where: spendingObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
};
