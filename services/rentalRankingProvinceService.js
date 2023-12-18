const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  create: async (spendingObj, transaction) => {
    try {
      const create = await Dao.rentalRankingProvinceDao.create(
        spendingObj,
        transaction
      );
      return create;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getAll: async (spendingObj, transaction) => {
    try {
      const details = await Dao.rentalRankingProvinceDao.getAll(
        spendingObj,
        transaction
      );
      return details;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  getDetail: async (spendingObj, transaction) => {
    try {
      const getDetail = await Dao.rentalRankingProvinceDao.getDetail(
        spendingObj,
        transaction
      );
      return getDetail;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  delete: async (spendingObj, transaction) => {
    try {
      const deletes = await Dao.rentalRankingProvinceDao.delete(
        spendingObj,
        transaction
      );
      return deletes;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  update: async (spendingObj, transaction) => {
    try {
      const updates = await Dao.rentalRankingProvinceDao.update(
        spendingObj,
        transaction
      );
      return updates;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
    const Dao = require("../dao");
    const logger = require("../util/logger");
    module.exports = {
      create: async (spendingObj, transaction) => {
        try {
          const create = await Dao.incomeRankingProvinceDao.create(
            spendingObj,
            transaction
          );
          return create;
        } catch (error) {
          logger.info(error);
          throw new Error(error);
        }
      },
      getAll: async (spendingObj, transaction) => {
        try {
          const details = await Dao.incomeRankingProvinceDao.getAll(
            spendingObj,
            transaction
          );
          return details;
        } catch (error) {
          logger.info(error);
          throw new Error(error);
        }
      },
      getDetail: async (spendingObj, transaction) => {
        try {
          const getDetail = await Dao.incomeRankingProvinceDao.getDetail(
            spendingObj,
            transaction
          );
          return getDetail;
        } catch (error) {
          logger.info(error);
          throw new Error(error);
        }
      },
      delete: async (spendingObj, transaction) => {
        try {
          const deletes = await Dao.incomeRankingProvinceDao.delete(
            spendingObj,
            transaction
          );
          return deletes;
        } catch (error) {
          logger.info(error);
          throw new Error(error);
        }
      },
      update: async (spendingObj, transaction) => {
        try {
          const updates = await Dao.incomeRankingProvinceDao.update(
            spendingObj,
            transaction
          );
          return updates;
        } catch (error) {
          logger.info(error);
          throw new Error(error);
        }
      },
    };
  },
};
