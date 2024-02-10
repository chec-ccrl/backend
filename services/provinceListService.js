const Dao = require("../dao");
const logger = require("../util/logger");
module.exports = {
  getAllProvinces: async (obj) => {
    try {
      const provinces = await Dao.provinceListDao.getAll(obj);
      return provinces;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
