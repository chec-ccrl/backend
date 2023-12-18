const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (spendingObj, transaction) => {
    try {
      const create = await Dao.rentalRankingCADao.create(
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
      const details = await Dao.rentalRankingCADao.getAll(
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
      const getDetail = await Dao.rentalRankingCADao.getDetail(
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
      const deletes = await Dao.rentalRankingCADao.delete(
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
      const updates = await Dao.rentalRankingCADao.update(
        spendingObj,
        transaction
      );
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
