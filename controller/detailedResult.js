const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");

module.exports = {
  result: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
