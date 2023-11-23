const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");
module.exports = {
  getAllProvinces: async () => {
    try {
      const result = await db.rentalRankingProvince.findAll({});
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
};
