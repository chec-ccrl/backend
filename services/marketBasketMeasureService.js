const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (marketObj, transaction) => {
    try {
      const create = await Dao.marketBasketMeasureDao.create(
        marketObj,
        transaction
      );
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  bulkCreate: async (marketObj, transaction) => {
    try {
      const bulkCreate = await Dao.marketBasketMeasureDao.bulkCreate(
        marketObj,
        transaction
      );
      return bulkCreate;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (marketObj, transaction) => {
    try {
      const market = await Dao.marketBasketMeasureDao.getAll(
        marketObj,
        transaction
      );
      return market;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (marketObj, transaction) => {
    try {
      const getDetail = await Dao.marketBasketMeasureDao.getDetail(
        marketObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (marketObj, transaction) => {
    try {
      const deletes = await Dao.marketBasketMeasureDao.delete(
        marketObj,
        transaction
      );
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (marketObj, transaction) => {
    try {
      const updates = await Dao.marketBasketMeasureDao.update(
        marketObj,
        transaction
      );
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
