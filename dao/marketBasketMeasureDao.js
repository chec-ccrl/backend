const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (marketObj, transaction) => {
    try {
      const marketBasketMeasure = await db.marketBasketMeasure.create(
        {
          id: Common.helper.generateId(),
          ...marketObj,
        },
        { transaction }
      );
      return marketBasketMeasure.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  bulkCreate: async (marketObj, transaction) => {
    try {
      const marketBasketMeasure = await db.marketBasketMeasure.bulkCreate(
        marketObj
      );
      return marketBasketMeasure;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (marketObj, transaction) => {
    try {
      if (marketObj.filter) {
        marketObj.filter = JSON.parse(marketObj.filter);
      }
      const replacementObj = {
        limit: Number(marketObj.limit),
        offset: Number(marketObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "marketBasketMeasures" 
                where province ilike :province and "deletedAt" is null order by "createdAt" desc limit :limit offset :offset`;
      if (marketObj?.filter?.province) {
        replacementObj.province = `%${marketObj.filter.province}%`;
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
      const result = await db.marketBasketMeasure.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (multiplierDao, transaction) => {
    try {
      const result = await db.marketBasketMeasure.destroy(
        { where: multiplierDao },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (marketObj, transaction) => {
    try {
      const updated = await db.marketBasketMeasure.update(
        marketObj,
        { where: { id: marketObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (marketObj, transaction) => {
    try {
      const result = await db.marketBasketMeasure.findOne({ where: marketObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
};
