const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (householdObj, transaction) => {
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
  getAll: async (householdObj, transaction) => {
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
  getDetail: async (householdObj, transaction) => {
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
  delete: async (householdObj, transaction) => {
    try {
      const deletes = await Dao.householdIncomeDao.delete(
        householdObj,
        transaction
      );
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (householdObj, transaction) => {
    try {
      const updates = await Dao.householdIncomeDao.update(
        householdObj,
        transaction
      );
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
