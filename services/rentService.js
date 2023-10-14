const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (rentObj) => {
    try {
      const create = await Dao.rentDao.create(rentObj, transaction);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (rentObj) => {
    try {
      const rent = await Dao.rentDao.getAll(rentObj, transaction);
      return rent;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (rentObj) => {
    try {
      const getDetail = await Dao.rentDao.getDetail(rentObj, transaction);
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
