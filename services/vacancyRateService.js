const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (vacancyObj) => {
    try {
      const create = await Dao.vacancyRateDao.create(vacancyObj, transaction);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (vacancyObj) => {
    try {
      const vacancys = await Dao.vacancyRateDao.getAll(vacancyObj, transaction);
      return vacancys;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (vacancyObj) => {
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
};
