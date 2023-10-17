const Common = require("../common");
const db = require("../models");
const logger = require("../util/logger");

const { QueryTypes, Op } = require("sequelize");
module.exports = {
  create: async (completeHousingObj, transaction) => {
    try {
      const completeHousing = await db.completeHousing.create(
        {
          id: Common.helper.generateId(),
          ...completeHousingObj,
        },
        { transaction }
      );
      return completeHousing.dataValues;
    } catch (error) {
      logger.info(error);
    }
  },
  getAll: async (completeHousingObj, transaction) => {
    try {
      if (completeHousingObj.filter) {
        completeHousingObj.filter = JSON.parse(completeHousingObj.filter);
      }
      const replacementObj = {
        limit: Number(completeHousingObj.limit),
        offset: Number(completeHousingObj.offset),
        province: "%%",
      };
      console.log(replacementObj);

      let sql = `SELECT id , count(*) over() as "total_count" from "completeHousings" where province ilike :province order by "createdAt" desc limit :limit offset :offset`;
      if (completeHousingObj?.filter?.province) {
        replacementObj.province = `%${completeHousingObj.filter.province}%`;
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


      const result = await db.completeHousing.findAll(query);
      return { result, count: data[0].total_count };
    } catch (error) {
      logger.info(error);
    }
  },
};
