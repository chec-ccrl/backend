const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");

module.exports = {
  detailPdf: async (req, res, next) => {
    try {
      const body = await Services.pdfService.detailPdfGenerator({});
    } catch (error) {
      next(error);
    }
  },
  simplePdf: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
