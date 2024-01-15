const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (spendingObj, transaction) => {
    try {
      const create = await Dao.householdSpendingDao.create(
        spendingObj,
        transaction
      );
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (spendingObj, transaction) => {
    try {
      const details = await Dao.householdSpendingDao.getAll(
        spendingObj,
        transaction
      );
      return details;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (spendingObj, transaction) => {
    try {
      const getDetail = await Dao.householdSpendingDao.getDetail(
        spendingObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (spendingObj, transaction) => {
    try {
      const deletes = await Dao.householdSpendingDao.delete(
        spendingObj,
        transaction
      );
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (spendingObj, transaction) => {
    try {
      const updates = await Dao.householdSpendingDao.update(
        spendingObj,
        transaction
      );
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  bulkCreate: async (marketObj, transaction) => {
    try {
      const bulkCreate = await Dao.householdSpendingDao.bulkCreate(
        marketObj,
        transaction
      );
      return bulkCreate;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
