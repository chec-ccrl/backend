const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");
const excelToJson = require("convert-excel-to-json");

module.exports = {
  addExcelProvince: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Rental Ranking Province.xlsx",
      });
      result = result["Sheet1"];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "Province") {
            let data = {
              province: obj["A"],
              ranking: obj["B"],
            };
            await Services.rankingService.createProvince(data);
          }
        })
      );
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
  addExcelCma: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Rental Ranking CMA.xlsx",
      });
      result = result["Sheet1"];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "CMA") {
            let data = {
              cma: obj["A"],
              ranking: obj["B"],
            };
            await Services.rankingService.createCma(data);
          }
        })
      );
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
  addExcelCa: async (req, res, next) => {
    try {
      let result = excelToJson({
        sourceFile: __dirname + "/Sample_Files/Rental Ranking CA.xlsx",
      });
      result = result["Sheet1"];
      await Promise.all(
        result.map(async (obj) => {
          if (obj["A"] !== "CA") {
            let data = {
              ca: obj["A"],
              ranking: obj["B"],
            };
            await Services.rankingService.createCa(data);
          }
        })
      );
      return res.json("Done");
    } catch (error) {
      next(error);
    }
  },
};
