const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.rent.createValidation(req.body);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const createRent = await Services.rentService.create(value);
      return res.status(200).send({
        status: 200,
        message: "Created successfully",
        data: createRent,
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
      const { rentId } = req.params;
      const details = await Services.rentService.getDetail({
        id: rentId,
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
