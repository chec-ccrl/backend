const ErrorHandler = require("../util/error");
const Services = require("../services");

const logger = require("../util/logger");

module.exports = {
  create: async (req, res, next) => {
    try {
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
