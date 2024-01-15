const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (dwellingObj, transaction) => {
    try {
      const dwellingType = await db.dwellingType.create(
        {
          id: Common.helper.generateId(),
          ...dwellingObj,
        },
        { transaction }
      );
      return dwellingType.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (dwellingObj, transaction) => {
    try {
      if (dwellingObj.filter) {
        dwellingObj.filter = JSON.parse(dwellingObj.filter);
      }
      const replacementObj = {
        limit: Number(dwellingObj.limit),
        offset: Number(dwellingObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "dwellingTypes" 
                where province ilike :province and "deletedAt" is null order by "createdAt" desc , "units" desc limit :limit offset :offset`;
      if (dwellingObj?.filter?.province) {
        replacementObj.province = `%${dwellingObj.filter.province}%`;
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
      const result = await db.dwellingType.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (dwellingObj, transaction) => {
    try {
      const result = await db.dwellingType.destroy(
        { where: dwellingObj },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (dwellingObj, transaction) => {
    try {
      const updated = await db.dwellingType.update(
        dwellingObj,
        { where: { id: dwellingObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  bulkCreate: async (marketObj, transaction) => {
    try {
      const canadaIncomeSurvey = await db.dwellingType.bulkCreate(marketObj);
      return canadaIncomeSurvey;
    } catch (error) {
      logger.info(error);
    }
  },
};
