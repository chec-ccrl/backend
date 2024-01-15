const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (multiplierObj, transaction) => {
    try {
      const create = await Dao.multiplierDao.create(multiplierObj, transaction);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (multiplierObj, transaction) => {
    try {
      const multiplier = await Dao.multiplierDao.getAll(
        multiplierObj,
        transaction
      );
      return multiplier;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (multiplierObj, transaction) => {
    try {
      const getDetail = await Dao.multiplierDao.getDetail(
        multiplierObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (multiplierObj, transaction) => {
    try {
      const deletes = await Dao.multiplierDao.delete(
        multiplierObj,
        transaction
      );
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (multiplierObj, transaction) => {
    try {
      const updates = await Dao.multiplierDao.update(
        multiplierObj,
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
      const bulkCreate = await Dao.multiplierDao.bulkCreate(
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
