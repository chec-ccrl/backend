const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (vacancyObj, transaction) => {
    try {
      const create = await Dao.vacancyRateDao.create(vacancyObj, transaction);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (vacancyObj, transaction) => {
    try {
      const vacancys = await Dao.vacancyRateDao.getAll(vacancyObj, transaction);
      return vacancys;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (vacancyObj, transaction) => {
    try {
      const getDetail = await Dao.vacancyRateDao.getDetail(
        vacancyObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (vacancyObj, transaction) => {
    try {
      const deletes = await Dao.vacancyRateDao.delete(vacancyObj, transaction);
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (vacancyObj, transaction) => {
    try {
      const updates = await Dao.vacancyRateDao.update(vacancyObj, transaction);
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
