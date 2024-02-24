const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

const excelToJson = require("convert-excel-to-json");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.vacancyRate.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const createVacancy = await Services.vacancyRateService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: createVacancy,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.vacancyRateService.getAll(
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
      const { vacancyRateId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.vacancyRateService.getDetail({
          id: vacancyRateId,
        });
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
      const { vacancyRateId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.vacancyRateService.delete(
          {
            id: vacancyRateId,
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
      const { error, value } = Validations.vacancyRate.createValidation(
        req.body
      );
      const { vacancyRateId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: vacancyRateId,
          ...value,
        };
        const updateVacancy = await Services.vacancyRateService.update(
          obj,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: updateVacancy,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  addExcelFiles: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Vacancy Rate.xlsx",
      });
      result = result["all data"];
      let arr = [];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Geography (Province name)") {
            let data = {
              province: obj["A"],
              cma: obj["B"],
              ca: obj["C"],
              house_type: obj["D"],
              bedroom_type: obj["E"],
              year: obj["F"],
              vacancy_rate: obj["G"],
            };
            arr.push(data);
          }
        })
      );
      await Services.vacancyRateService.bulkCreate(arr);
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
