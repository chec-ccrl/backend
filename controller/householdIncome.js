const ErrorHandler = require("../util/error");
const Services = require("../services");

const logger = require("../util/logger");
const Validations = require("../validations");
module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.householdIncome.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const createHouse = await Services.householdIncomeService.create(value);
      return res.status(200).send({
        status: 200,
        message: "Created successfully",
        data: createHouse,
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  getDetail: async (req, res, next) => {
    try {
      const { householdIncomeId } = req.params;
      const details = await Services.householdIncomeService.getDetail({
        id: householdIncomeId,
      });
      return res.status(200).send({
        status: 200,
        message: "Details fetched successfully",
        data: details,
      });
    } catch (error) {
      next(error);
    }
  },
};
