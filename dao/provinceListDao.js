const db = require("../models");
const logger = require("../util/logger");
module.exports = {
  getAll: async (obj) => {
    try {
      const result = await db.provinceList.findAll({ where: obj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
};
