const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (completeHousingObj, transaction) => {
    try {
      const createHousing = await Dao.canadaIncomeSurveyDao.create(
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
      const Housing = await Dao.canadaIncomeSurveyDao.getAll(
        completeHousingObj,
        transaction
      );
      return Housing;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  
  getAlls: async (completeHousingObj, transaction) => {
    try {
      const Housing = await Dao.canadaIncomeSurveyDao.getAlls(
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
      const getDetail = await Dao.canadaIncomeSurveyDao.getDetail(
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
      const deletes = await Dao.canadaIncomeSurveyDao.delete(
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
      const updates = await Dao.canadaIncomeSurveyDao.update(
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
      const bulkCreate = await Dao.canadaIncomeSurveyDao.bulkCreate(
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
