const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (userObj, transaction) => {
    try {
      const create = await Dao.userDao.create(userObj, transaction);
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (userObj, transaction) => {
    try {
      const user = await Dao.userDao.getAll(userObj, transaction);
      return user;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (userObj, transaction) => {
    try {
      const getDetail = await Dao.userDao.getDetail(userObj, transaction);
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
