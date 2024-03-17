const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (marketObj) => {
    try {
      const create = await Dao.marketBasketMeasureDao.create(marketObj);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  bulkCreate: async (marketObj) => {
    try {
      const bulkCreate = await Dao.marketBasketMeasureDao.bulkCreate(marketObj);
      return bulkCreate;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (marketObj) => {
    try {
      const market = await Dao.marketBasketMeasureDao.getAll(marketObj);
      return market;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (marketObj) => {
    try {
      const getDetail = await Dao.marketBasketMeasureDao.getDetail(marketObj);
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (marketObj) => {
    try {
      const deletes = await Dao.marketBasketMeasureDao.delete(marketObj);
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (marketObj) => {
    try {
      const updates = await Dao.marketBasketMeasureDao.update(marketObj);
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
