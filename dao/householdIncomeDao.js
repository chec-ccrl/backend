const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (householdObj, transaction) => {
    try {
      const householdIncome = await db.householdIncome.create(
        {
          id: Common.helper.generateId(),
          ...householdObj,
        },
        { transaction }
      );
      return householdIncome.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (householdObj, transaction) => {
    try {
      if (householdObj.filter) {
        householdObj.filter = JSON.parse(householdObj.filter);
      }
      const replacementObj = {
        limit: Number(householdObj.limit),
        offset: Number(householdObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "householdIncomes" where 
                "Province" ilike :province and "deletedAt" is null order by "createdAt" desc , "Province" desc limit :limit offset :offset`;
      if (householdObj?.filter?.province) {
        replacementObj.province = `%${householdObj.filter.province}%`;
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
      const result = await db.householdIncome.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (householdObj, transaction) => {
    try {
      const result = await db.householdIncome.destroy(
        { where: householdObj },
        transaction
      );
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (householdObj, transaction) => {
    try {
      const updated = await db.householdIncome.update(
        householdObj,
        { where: { id: householdObj.id } },
        { transaction }
      );
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
};
