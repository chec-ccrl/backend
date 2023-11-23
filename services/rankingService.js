const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
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
