const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const Common = require("../common");
const logger = require("../util/logger");
const db = require("../models");

const excelToJson = require("convert-excel-to-json");
module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.incomeRankingCMA.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const spendingDetails = await Services.incomeRankingCMAService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: spendingDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.incomeRankingCMAService.getAll(
          req.query,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getDetail: async (req, res, next) => {
    try {
      const { incomeRankingCMAId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.incomeRankingCMAService.getDetail(
          {
            id: incomeRankingCMAId,
          },
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Details fetched successfully",
          data: details,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { incomeRankingCMAId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.incomeRankingCMAService.delete(
          {
            id: incomeRankingCMAId,
          },
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Details fetched successfully",
          data: details,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { error, value } = Validations.incomeRankingCMA.createValidation(
        req.body
      );
      const { incomeRankingCMAId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: incomeRankingCMAId,
          ...value,
        };
        const spendingDetails = await Services.incomeRankingCMAService.update(
          obj,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: spendingDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  addExcelFiles: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Income Ranking CMA.xlsx",
      });
      result = result["Sheet1"];

      let arr = [];
      result.map((obj) => {
        if (obj["A"] !== "CMA") {
          let data = {
            id: Common.helper.generateId(),
            cma: obj["A"],
            ranking: Number(obj["B"]),
          };
          arr.push(data);
        }
      });
      await Services.incomeRankingCMAService.bulkCreate(arr);
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
