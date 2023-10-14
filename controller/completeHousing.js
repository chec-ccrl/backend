const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.completeHousing.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const createHousing = await Services.completeHousingService.create(value);
      return res.status(200).send({
        status: 200,
        message: "Created successfully",
        data: createHousing,
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
      const { completeHousingId } = req.params;
      const details = await Services.completeHousingService.getDetail({
        id: completeHousingId,
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
