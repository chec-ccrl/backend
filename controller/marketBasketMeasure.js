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
      const { error, value } = Validations.marketBasketMeasure.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const measureDetails = await Services.marketBasketMeasureService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: measureDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.marketBasketMeasureService.getAll(
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
      const { marketBasketMeasureId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.marketBasketMeasureService.getDetail(
          {
            id: marketBasketMeasureId,
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
      const { marketBasketMeasureId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.marketBasketMeasureService.delete(
          {
            id: marketBasketMeasureId,
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
      const { error, value } = Validations.marketBasketMeasure.createValidation(
        req.body
      );
      const { marketBasketMeasureId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: marketBasketMeasureId,
          ...value,
        };
        const measureDetails = await Services.marketBasketMeasureService.update(
          obj,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: measureDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  addExcelFiles: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Market Basket Measure.xlsx",
      });
      result = result["Sheet 1 - Market Basket Measure"];
      let arr = [];
      result.map((obj) => {
        if (obj["A"] !== "Province" && obj["A"] !== "Market Basket Measure") {
          let data = {
            id: Common.helper.generateId(),
            province: obj["A"],
            popuplation_type: obj["B"],
            city: obj["C"],
            cma: obj["D"],
            ca: obj["E"],
            year: Number(obj["F"]) === "nan" ? 0 : Number(obj["F"]),
            cost: Number(obj["G"]) === "nan" ? 0 : Number(obj["G"]),
          };
          arr.push(data);
        }
      });
      await Services.marketBasketMeasureService.bulkCreate(arr);
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
