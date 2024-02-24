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
      const { error, value } = Validations.canadaIncomeSurvey.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const createHousing = await Services.canadaIncomeSurveyService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: createHousing,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.canadaIncomeSurveyService.getAll(
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
      const { canadaIncomeSurveyId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.canadaIncomeSurveyService.getDetail(
          {
            id: canadaIncomeSurveyId,
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
      const { canadaIncomeSurveyId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.canadaIncomeSurveyService.delete(
          {
            id: canadaIncomeSurveyId,
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
      const { error, value } = Validations.canadaIncomeSurvey.createValidation(
        req.body
      );
      const { canadaIncomeSurveyId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: canadaIncomeSurveyId,
          ...value,
        };
        const createHousing = await Services.canadaIncomeSurveyService.update(
          obj,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: createHousing,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  addExcelFiles: async (req, res, next) => {
    try {
      let result1 = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Canadian Income Survey.xlsx",
      });

      let result = result1["Percentage of families"];
      let arr = [];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            let objj = {
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              income_bracket: obj["D"],
              year: obj["E"],
              percentage_of_family_total_income: obj["F"],
              percentage_of_family_after_tax_income: obj["G"],
              number_of_family_total_income: obj["H"],
              number_of_family_after_tax_income: obj["I"],
            };
            arr.push(objj);
          }
        })
      );
      await Services.canadaIncomeSurveyService.bulkCreate(arr);
      result = result1["Median Income"];

      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            const survey = await Services.canadaIncomeSurveyService.getDetail({
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              year: obj["D"],
            });
            if (survey) {
              await Promise.all(
                survey.map(async (sur) => {
                  await Services.canadaIncomeSurveyService.update({
                    id: sur.id,
                    median_before_tax: obj["E"],
                    median_after_tax: obj["F"],
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
