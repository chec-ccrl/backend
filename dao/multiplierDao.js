const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (multiplierObj, transaction) => {
    try {
      const multiplier = await db.multiplier.create(
        {
          id: Common.helper.generateId(),
          ...multiplierObj,
        },
        { transaction }
      );
      return multiplier.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (multiplierObj, transaction) => {
    try {
      if (multiplierObj.filter) {
        multiplierObj.filter = JSON.parse(multiplierObj.filter);
      }
      const replacementObj = {
        limit: Number(multiplierObj.limit),
        offset: Number(multiplierObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "multipliers" 
                where province ilike :province and "deletedAt" is null order by "createdAt" desc limit :limit offset :offset`;
      if (multiplierObj?.filter?.province) {
        replacementObj.province = `%${multiplierObj.filter.province}%`;
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
      const result = await db.multiplier.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (multiplierDao, transaction) => {
    try {
      const result = await db.multiplier.destroy(
        { where: multiplierDao },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (multiplierObj, transaction) => {
    try {
      const updated = await db.multiplier.update(
        multiplierObj,
        { where: { id: multiplierObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (multiplierObj, transaction) => {
    try {
      const result = await db.multiplier.findOne({ where: multiplierObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  bulkCreate: async (marketObj, transaction) => {
    try {
      const canadaIncomeSurvey = await db.multiplier.bulkCreate(marketObj);
      return canadaIncomeSurvey;
    } catch (error) {
      logger.info(error);
    }
  },
};
