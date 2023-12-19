const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (spendingObj, transaction) => {
    try {
      const incomeRankingCa = await db.incomeRankingCa.create(
        {
          id: Common.helper.generateId(),
          ...spendingObj,
        },
        { transaction }
      );
      return incomeRankingCa.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (spendingObj, transaction) => {
    try {
      if (spendingObj.filter) {
        spendingObj.filter = JSON.parse(spendingObj.filter);
      }
      const replacementObj = {
        limit: Number(spendingObj.limit),
        offset: Number(spendingObj.offset),
        ca: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "incomeRankingCas" 
                where ca ilike :ca and "deletedAt" is null order by "createdAt" desc limit :limit offset :offset`;
      if (spendingObj?.filter?.ca) {
        replacementObj.ca = `%${spendingObj.filter.ca}%`;
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
      const result = await db.incomeRankingCa.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (spendingObj, transaction) => {
    try {
      const result = await db.incomeRankingCa.destroy(
        { where: spendingObj },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (spendingObj, transaction) => {
    try {
      const updated = await db.incomeRankingCa.update(
        spendingObj,
        { where: { id: spendingObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (spendingObj, transaction) => {
    try {
      const result = await db.incomeRankingCa.findOne({ where: spendingObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  bulkCreate: async (marketObj, transaction) => {
    try {
      const incomeRankingCA = await db.incomeRankingCA.bulkCreate(marketObj);
      return incomeRankingCA;
    } catch (error) {
      logger.info(error);
    }
  },
};
