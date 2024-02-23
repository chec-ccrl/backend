const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (spendingObj) => {
    try {
      const create = await Dao.householdSpendingDao.create(spendingObj);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (spendingObj) => {
    try {
      const details = await Dao.householdSpendingDao.getAll(spendingObj);
      return details;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (spendingObj) => {
    try {
      const getDetail = await Dao.householdSpendingDao.getDetail(spendingObj);
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (spendingObj) => {
    try {
      const deletes = await Dao.householdSpendingDao.delete(spendingObj);
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (spendingObj) => {
    try {
      const updates = await Dao.householdSpendingDao.update(spendingObj);
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  bulkCreate: async (marketObj) => {
    try {
      const bulkCreate = await Dao.householdSpendingDao.bulkCreate(marketObj);
      return bulkCreate;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
