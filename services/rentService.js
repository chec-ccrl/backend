const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (rentObj, transaction) => {
    try {
      const create = await Dao.rentDao.create(rentObj, transaction);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (rentObj, transaction) => {
    try {
      const rent = await Dao.rentDao.getAll(rentObj, transaction);
      return rent;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (rentObj, transaction) => {
    try {
      const getDetail = await Dao.rentDao.getDetail(rentObj, transaction);
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetails: async (rentObj, transaction) => {
    try {
      const getDetails = await Dao.rentDao.getDetails(rentObj, transaction);
      return getDetails;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (rentObj, transaction) => {
    try {
      const deletes = await Dao.rentDao.delete(rentObj, transaction);
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (rentObj, transaction) => {
    try {
      const updates = await Dao.rentDao.update(rentObj, transaction);
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
