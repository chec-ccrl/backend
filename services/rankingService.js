const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  createProvince: async (obj, transaction) => {
    try {
      const provinces = await Dao.rankingDao.createProvince(obj, transaction);
      return provinces;
    } catch (error) {
      throw new Error(error);
    }
  },
  createCma: async (obj, transaction) => {
    try {
      const cma = await Dao.rankingDao.createCma(obj, transaction);
      return cma;
    } catch (error) {
      throw new Error(error);
    }
  },
  createCa: async (obj, transaction) => {
    try {
      const ca = await Dao.rankingDao.createCa(obj, transaction);
      return ca;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllProvinces: async () => {
    try {
      const provinces = await Dao.rankingDao.getAllProvinces();
      return provinces;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
