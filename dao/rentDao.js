const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");
const { QueryTypes, Op } = require("sequelize");

module.exports = {
  create: async (rentObj) => {
    try {
      const rent = await db.rent.create({
        id: Common.helper.generateId(),
        ...rentObj,
      });
      return rent.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (rentObj) => {
    try {
      if (rentObj.filter) {
        rentObj.filter = JSON.parse(rentObj.filter);
      }
      const replacementObj = {
        limit: Number(rentObj.limit),
        offset: Number(rentObj.offset),
        province: "%%",
      };
      let sql = `SELECT id , count(*) over() as "total_count" from "rents" 
                 where (province ilike :province or cma ilike :province or ca ilike :province) `;

      if (marketObj?.filter?.year) {
        sql += `and  year = ${Number(marketObj.filter.year)} `;
      }
      sql += `  and "deletedAt" is null order by "createdAt" desc limit :limit offset :offset`;
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
      };
      const result = await db.rent.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
  delete: async (rentObj) => {
    try {
      const result = await db.rent.destroy({ where: rentObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  update: async (rentObj) => {
    try {
      const updated = await db.rent.update(rentObj, {
        where: { id: rentObj.id },
      });
      return updated;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetail: async (rentObj) => {
    try {
      const result = await db.rent.findOne({ where: rentObj });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  getDetails: async (rentObj) => {
    try {
      const result = await db.rent.findAll({
        where: rentObj,
      });
      return result;
    } catch (error) {
      logger.info(error);
    }
  },
  bulkCreate: async (marketObj) => {
    try {
      const canadaIncomeSurvey = await db.rent.bulkCreate(marketObj);
      return canadaIncomeSurvey;
    } catch (error) {
      logger.info(error);
    }
  },
};
