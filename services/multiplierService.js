const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (multiplierObj) => {
    try {
      const create = await Dao.multiplierDao.create(multiplierObj);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (multiplierObj) => {
    try {
      const multiplier = await Dao.multiplierDao.getAll(multiplierObj);
      return multiplier;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAllFr: async (multiplierObj) => {
    try {
      const multiplier = await Dao.multiplierDao.getAllFr(multiplierObj);
      return multiplier;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (multiplierObj) => {
    try {
      const getDetail = await Dao.multiplierDao.getDetail(multiplierObj);
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (multiplierObj) => {
    try {
      const deletes = await Dao.multiplierDao.delete(multiplierObj);
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (multiplierObj) => {
    try {
      const updates = await Dao.multiplierDao.update(multiplierObj);
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  bulkCreate: async (marketObj) => {
    try {
      const bulkCreate = await Dao.multiplierDao.bulkCreate(marketObj);
      return bulkCreate;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
