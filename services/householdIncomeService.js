const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (householdObj) => {
    try {
      const create = await Dao.householdIncomeDao.create(
        householdObj,
        transaction
      );
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (householdObj) => {
    try {
      const household = await Dao.householdIncomeDao.getAll(
        householdObj,
        transaction
      );
      return household;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (householdObj) => {
    try {
      const getDetail = await Dao.householdIncomeDao.getDetail(
        householdObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
