const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (spendingObj) => {
    try {
      const householdSpend = await db.householdSpend.create({
        id: Common.helper.generateId(),
        ...spendingObj,
      });
      return householdSpend.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (spendingObj) => {
    try {
      if (spendingObj.filter) {
        spendingObj.filter = JSON.parse(spendingObj.filter);
      }
      const replacementObj = {
        limit: Number(spendingObj.limit),
        offset: Number(spendingObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "householdSpends" 
                where (province ilike :province or cma ilike :province or ca ilike :province) `;
      if (spendingObj?.filter?.year) {
        sql += `and  year = ${Number(spendingObj.filter.year)} `;
      }
      sql += `  and "deletedAt" is null order by "createdAt" desc limit :limit offset :offset`;
      if (spendingObj?.filter?.province) {
        replacementObj.province = `%${spendingObj.filter.province}%`;
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
      };
      const result = await db.householdSpend.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (spendingObj) => {
    try {
      const result = await db.householdSpend.destroy({ where: spendingObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (spendingObj) => {
    try {
      const updated = await db.householdSpend.update(spendingObj, {
        where: { id: spendingObj.id },
      });
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (spendingObj) => {
    try {
      const result = await db.householdSpend.findOne({ where: spendingObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  bulkCreate: async (marketObj) => {
    try {
      const canadaIncomeSurvey = await db.householdSpend.bulkCreate(marketObj);
      return canadaIncomeSurvey;
    } catch (error) {
      logger.info(error);
    }
  },
};
