const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

const excelToJson = require("convert-excel-to-json");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.householdSpending.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const spendingDetails = await Services.householdSpendingService.create(
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
        const data = await Services.householdSpendingService.getAll(
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
      const { householdSpendingId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.householdSpendingService.getDetail(
          {
            id: householdSpendingId,
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
      const { householdSpendingId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.householdSpendingService.delete(
          {
            id: householdSpendingId,
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
      const { error, value } = Validations.householdSpending.createValidation(
        req.body
      );
      const { householdSpendingId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: householdSpendingId,
          ...value,
        };
        const spendingDetails = await Services.householdSpendingService.update(
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
        sourceFile: __dirname + "/Sample_Files/Household Spending.xlsx",
      });
      result = result["Sheet 1 - Household Spending"];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Province" || obj["A"] !== "Household Spending") {
            let data = {
              province: obj["A"],
              year: obj["B"],
              cost: obj["C"],
            };
            await Services.householdSpendingService.create(data);
          }
        })
      );
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
