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
      let result1 = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Income Ranking CMA.xlsx",
      });
      let result = result1["Before Tax"];

      let arr = [];
      result.map((obj) => {
        if (obj["A"] !== "Geography (Province name)") {
          let data = {
            id: Common.helper.generateId(),
            province: obj["A"],
            cma: obj["B"],
            year: obj["C"],
            ranking_before_tax: Number(obj["D"]),
          };
          arr.push(data);
        }
      });
      await Services.incomeRankingCMAService.bulkCreate(arr);
      result = result1["After Tax"];

      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            const survey = await Services.incomeRankingCMAService.getDetail({
              province: obj["A"],
              cma: obj["B"],
              year: obj["C"],
            });
            if (survey.length > 0) {
              await Promise.all(
                survey.map(async (sur) => {
                  await Services.incomeRankingCMAService.update({
                    id: sur.id,
                    ranking_after_tax: Number(obj["D"]),
                  });
                })
              );
            }
          }
        })
      );
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
