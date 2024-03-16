const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.rentalRankingCMA.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const spendingDetails = await Services.rentalRankingCMAService.create(
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
        const data = await Services.rentalRankingCMAService.getAll(
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
      const { rentalRankingCMAId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.rentalRankingCMAService.getDetail(
          {
            id: rentalRankingCMAId,
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
      const { rentalRankingCMAId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.rentalRankingCMAService.delete(
          {
            id: rentalRankingCMAId,
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
      const { error, value } = Validations.rentalRankingCMA.createValidation(
        req.body
      );
      const { rentalRankingCMAId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: rentalRankingCMAId,
          ...value,
        };
        const spendingDetails = await Services.rentalRankingCMAService.update(
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
        sourceFile: __dirname + "/Sample_Files/Rental ranking CA.xlsx",
      });
      let result = result1["Sheet1"];

      let arr = [];
      result.map((obj) => {
        if (obj["A"] !== "Geography (CMA name)") {
          let data = {
            id: Common.helper.generateId(),
            ca: obj["A"],
            year: obj["B"],
            ranking: Number(obj["C"]),
          };
          arr.push(data);
        }
      });
      await Services.rentalRankingCMAService.bulkCreate(arr);
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
