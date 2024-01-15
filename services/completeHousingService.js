const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (completeHousingObj, transaction) => {
    try {
      const createHousing = await Dao.completeHousingDao.create(
        completeHousingObj,
        transaction
      );
      return createHousing;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (completeHousingObj, transaction) => {
    try {
      const Housing = await Dao.completeHousingDao.getAll(
        completeHousingObj,
        transaction
      );
      return Housing;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (completeHousingObj, transaction) => {
    try {
      const getDetail = await Dao.completeHousingDao.getDetail(
        completeHousingObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (completeHousingObj, transaction) => {
    try {
      const deletes = await Dao.completeHousingDao.delete(
        completeHousingObj,
        transaction
      );
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (completeHousingObj, transaction) => {
    try {
      const updates = await Dao.completeHousingDao.update(
        completeHousingObj,
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
      const bulkCreate = await Dao.completeHousingDao.bulkCreate(
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
