const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (rentObj, transaction) => {
    try {
      const rent = await db.rent.create(
        {
          id: Common.helper.generateId(),
          ...rentObj,
        },
        { transaction }
      );
      return rent.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (rentObj, transaction) => {
    try {
      if (rentObj.filter) {
        rentObj.filter = JSON.parse(rentObj.filter);
      }
      const replacementObj = {
        limit: Number(rentObj.limit),
        offset: Number(rentObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "rents" where "province" ilike :province order by "createdAt" desc , "rent_value" desc limit :limit offset :offset`;
      if (rentObj?.filter?.province) {
        replacementObj.province = `%${rentObj.filter.province}%`;
      }

      const data = await db.sequelize.query(sql, {
        replacements: replacementObj,
        type: QueryTypes.SELECT,
      });

      const ids = [];

      if (data.length === 0) {
        return { count: 0, result: [] };
      }
      for (let i = 0; i < data.length; i += 1) {
        ids.push(data[i].id);
      }
      let query = {
        where: {
          id: ids,
        },
        order: [["createdAt", "DESC"]],
        transaction,
      };
      const result = await db.rent.findAll(query);
      return { result, count: result.length };
    } catch (error) {
      logger.info(error);
    }
  },
};
