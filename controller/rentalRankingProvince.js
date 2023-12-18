const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } =
        Validations.rentalRankingProvince.createValidation(req.body);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const spendingDetails =
          await Services.rentalRankingProvinceService.create(
            value,
            transaction
          );
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: spendingDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const data = await Services.rentalRankingProvinceService.getAll(
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
      const { rentalRankingProvinceId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.rentalRankingProvinceService.getDetail(
          {
            id: rentalRankingProvinceId,
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
      const { rentalRankingProvinceId } = req.params;
      const result = await db.sequelize.transaction(async (transaction) => {
        const details = await Services.rentalRankingProvinceService.delete(
          {
            id: rentalRankingProvinceId,
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
      const { error, value } =
        Validations.rentalRankingProvince.createValidation(req.body);
      const { rentalRankingProvinceId } = req.params;
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const result = await db.sequelize.transaction(async (transaction) => {
        const obj = {
          id: rentalRankingProvinceId,
          ...value,
        };
        const spendingDetails =
          await Services.rentalRankingProvinceService.update(obj, transaction);
        return res.status(200).send({
          status: 200,
          message: "Created successfully",
          data: spendingDetails,
        });
      });
    } catch (error) {
      next(error);
    }
  },
};
