const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (dwellingObj, transaction) => {
    try {
      const createDwelling = await Dao.dwellingTypeDao.create(
        dwellingObj,
        transaction
      );
      return createDwelling;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (dwellingObj, transaction) => {
    try {
      const dwelling = await Dao.dwellingTypeDao.getAll(
        dwellingObj,
        transaction
      );
      return dwelling;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (dwellingObj, transaction) => {
    try {
      const getDetail = await Dao.dwellingTypeDao.getDetail(
        dwellingObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (dwellingObj, transaction) => {
    try {
      const deletes = await Dao.dwellingTypeDao.delete(
        dwellingObj,
        transaction
      );
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (dwellingObj, transaction) => {
    try {
      const updates = await Dao.dwellingTypeDao.update(
        dwellingObj,
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
      const bulkCreate = await Dao.dwellingTypeDao.bulkCreate(
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
