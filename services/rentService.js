const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (rentObj) => {
    try {
      const create = await Dao.rentDao.create(rentObj);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (rentObj) => {
    try {
      const rent = await Dao.rentDao.getAll(rentObj);
      return rent;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAlls: async (rentObj) => {
    try {
      const rent = await Dao.rentDao.getAlls(rentObj);
      return rent;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (rentObj) => {
    try {
      const getDetail = await Dao.rentDao.getDetail(rentObj);
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetails: async (rentObj) => {
    try {
      const getDetails = await Dao.rentDao.getDetails(rentObj);
      return getDetails;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (rentObj) => {
    try {
      const deletes = await Dao.rentDao.delete(rentObj);
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (rentObj) => {
    try {
      const updates = await Dao.rentDao.update(rentObj);
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  bulkCreate: async (marketObj) => {
    try {
      const bulkCreate = await Dao.rentDao.bulkCreate(marketObj);
      return bulkCreate;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
