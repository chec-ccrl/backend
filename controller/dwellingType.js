const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");
const xlsx = require("xlsx");

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
      result = result["All Data"];
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
  uploadExcelFiles: async (req, res, next) => {
    try {
      if (!req.files) {
        return res.status(400).json("No file uploaded.");
      }
      const workbook = xlsx.read(req.files[0].buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      let data = excelToJson({
        source: req.files[0].buffer,
      });
      data = data[sheetName];
      let arr = [];
      data.map(async (obj) => {
        if (obj["A"] !== "Geography (Province name)") {
          let t = {
            province: obj["A"],
            cma: obj["B"],
            ca: obj["C"],
            house_type: obj["D"],
            bedroom_type: obj["E"],
            year: Number(obj["F"]),
            units: Number(obj["G"]),
          };
          arr.push(t);
        }
      });

      await Services.dwellingTypeService.bulkCreate(arr);

      return res.status(200).json({ message: "Done", status: 200 });
    } catch (error) {
      next(error);
    }
  },
};
