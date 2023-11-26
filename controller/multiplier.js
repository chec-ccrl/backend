const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

const excelToJson = require("convert-excel-to-json");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.multiplier.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const multiplierDetails = await Services.multiplierService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: multiplierDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.multiplierService.getAll(
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
      const { multiplierId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.multiplierService.getDetail(
          {
            id: multiplierId,
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
      const { multiplierId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.multiplierService.delete(
          {
            id: multiplierId,
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
      const { error, value } = Validations.multiplier.createValidation(
        req.body
      );
      const { multiplierId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: multiplierId,
          ...value,
        };
        const multiplierDetails = await Services.multiplierService.update(
          obj,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: multiplierDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  addExcelFiles: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Multiplier.xlsx",
      });
      result = result["Sheet1"];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Province") {
            let data = {
              province: obj["A"],
              rent: obj["B"],
              utility: obj["C"],
            };
            await Services.multiplierService.create(data);
          }
        })
      );
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
