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
      let result1 = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Multiplier.xlsx",
      });
      let result = result1["Multiplier"];
      let ar = [];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            let objj = {
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              year: obj["D"],
              rent: obj["E"],
              utility: obj["F"],
            };
            ar.push(objj);
          }
        })
      );
      await Services.multiplierService.bulkCreate(ar);
      result = result1["Utility cost"];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            const survey = await Services.multiplierService.getDetail({
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              year: obj["D"],
            });
            if (survey) {
              await Services.multiplierService.update({
                id: survey.id,
                average_utility: obj["E"],
              });
            }
          }
        })
      );

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
      let data1 = excelToJson({
        source: req.files[0].buffer,
      });
      let data = data1[sheetName];
      let ar = [];
      await Promise.all(
        data.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            let objj = {
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              year: obj["D"],
              rent: obj["E"],
              utility: obj["F"],
            };
            ar.push(objj);
          }
        })
      );
      await Services.multiplierService.bulkCreate(ar);

      result = data1[workbook.SheetNames[1]];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            const survey = await Services.multiplierService.getDetail({
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              year: obj["D"],
            });
            if (survey) {
              await Services.multiplierService.update({
                id: survey.id,
                average_utility: obj["E"],
              });
            }
          }
        })
      );
      return res.status(200).json({ message: "Done", status: 200 });
    } catch (error) {
      next(error);
    }
  },
};
