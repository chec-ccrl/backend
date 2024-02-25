const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (vacancyObj, transaction) => {
    try {
      const vacancyRate = await db.vacancyRate.create(
        {
          id: Common.helper.generateId(),
          ...vacancyObj,
        },
        { transaction }
      );
      return vacancyRate.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (vacancyObj, transaction) => {
    try {
      if (vacancyObj.filter) {
        vacancyObj.filter = JSON.parse(vacancyObj.filter);
      }
      const replacementObj = {
        limit: Number(vacancyObj.limit),
        offset: Number(vacancyObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "vacancyRates" 
                where (province ilike :province or cma ilike :province or ca ilike :province) `;

      if (vacancyObj?.filter?.year) {
        sql += `and  year = ${Number(vacancyObj.filter.year)} `;
      }
      sql += `  and "deletedAt" is null order by "createdAt" desc limit :limit offset :offset`;
      if (vacancyObj?.filter?.province) {
        replacementObj.province = `%${vacancyObj.filter.province}%`;
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
      const result = await db.vacancyRate.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (vacancyObj, transaction) => {
    try {
      const result = await db.vacancyRate.destroy(
        { where: vacancyObj },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (vacancyObj, transaction) => {
    try {
      const updated = await db.vacancyRate.update(
        vacancyObj,
        { where: { id: vacancyObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  bulkCreate: async (marketObj, transaction) => {
    try {
      const canadaIncomeSurvey = await db.vacancyRate.bulkCreate(marketObj);
      return canadaIncomeSurvey;
    } catch (error) {
      logger.info(error);
    }
  },
};
