const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error, value } = Validations.dwellingType.createValidation(
        req.body
      );
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      const createDwelling = await Services.dwellingTypeService.create(value);
      return res.status(200).send({
        status: 200,
        message: "Created successfully",
        data: createDwelling,
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
      const { dwellingTypeId } = req.params;
      const details = await Services.dwellingTypeService.getDetail({
        id: dwellingTypeId,
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
