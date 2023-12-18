const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

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
};
