const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");

module.exports = {
  create: async (userObj, transaction) => {
    try {
      const user = await db.user.create(
        {
          id: Common.helper.generateId(),
          ...userObj,
        },
        { transaction }
      );
      return user.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
};
