const ErrorHandler = require("../util/error");
const Services = require("../services");

const logger = require("../util/logger");
const Validations = require("../validations");
const db = require("../models");
module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.householdIncome.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const createHouse = await Services.householdIncomeService.create(
          value,
          transaction
        );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: createHouse,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.householdIncomeService.getAll(
          { limit: req.query.limit, offset: req.query.offset },
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
      const { householdIncomeId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.householdIncomeService.getDetail(
          {
            id: householdIncomeId,
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
};
