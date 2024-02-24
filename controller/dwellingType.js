const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

const excelToJson = require("convert-excel-to-json");
module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.dwellingType.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const createDwelling = await Services.dwellingTypeService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: createDwelling,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.dwellingTypeService.getAll(
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
      const { dwellingTypeId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.dwellingTypeService.getDetail(
          {
            id: dwellingTypeId,
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
      const { dwellingTypeId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.dwellingTypeService.delete(
          {
            id: dwellingTypeId,
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
      const { error, value } = Validations.dwellingType.createValidation(
        req.body
      );
      const { dwellingTypeId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: dwellingTypeId,
          ...value,
        };
        const updateDwelling = await Services.dwellingTypeService.update(
          obj,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: updateDwelling,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  addExcelFiles: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile:
          __dirname + "/Sample_Files/Structural type of dwelling.xlsx",
      });
      result = result["main"];
      let arr = [];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            let t = {
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              house_type: obj["D"],
              bedroom_type: obj["E"],
              year: obj["F"],
              units: obj["G"] === "#N/A" ? 0 : obj["G"],
            };
            arr.push(t);
          }
        })
      );
      await Services.dwellingTypeService.bulkCreate(arr);

      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
