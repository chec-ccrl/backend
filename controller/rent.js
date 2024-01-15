const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

const excelToJson = require("convert-excel-to-json");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.rent.createValidation(req.body);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const createRent = await Services.rentService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: createRent,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.rentService.getAll(req.query, transaction);
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
      const { rentId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.rentService.getDetail(
          {
            id: rentId,
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
      const { rentId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.rentService.delete(
          {
            id: rentId,
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
      const { error, value } = Validations.rent.createValidation(req.body);
      const { rentId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: rentId,
          ...value,
        };
        const updateRent = await Services.rentService.update(obj, transaction);
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: updateRent,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  addExcelFiles: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/CMHC Rent.xlsx",
      });
      result = result["Sheet1"];
      let arr = [];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            let data = {
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              house_type:obj["D"],
              bedroom_type:obj["E"],
              year: obj["F"],
              rent_value: obj["G"],
            };
            arr.push(data);
          }
        })
      );
      await Services.rentService.bulkCreate(arr);
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
