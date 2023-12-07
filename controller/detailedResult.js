const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");
const Common = require("../common");

const bedroom_type_const = [
  "No bedrooms",
  "1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
];

module.exports = {
  result: async (req, res, next) => {
    try {
      const pdfResult = await Services.pdfService.detailPdfGenerator();
      return res.status(200).json(pdfResult);
      const {
        province,
        geography,
        geography_type,
        year,
        affordability,
        source_of_cost_of_non_shelter_necessity,
        house_type,
        rent_source,
      } = req.body;

      const multiplierDetails = await Services.multiplierService.getDetails({
        province,
      });
      //*************** RANKING ************************** */
      const rental_ranking_province =
        await Services.rankingService.rentalProvice({ province });
      const income_ranking_province =
        await Services.rankingService.incomeProvice({ province });
      let rental_ranking_geography, income_ranking_geography;
      if (geography_type === "CA") {
        rental_ranking_geography = await Services.rankingService.rentalCA({
          ca: geography,
        });
        income_ranking_geography = await Services.rankingService.incomeCA({
          ca: geography,
        });
      } else if (geography_type === "CMA") {
        rental_ranking_geography = await Services.rankingService.rentalCMA({
          ca: geography,
        });
        income_ranking_geography = await Services.rankingService.incomeCMA({
          ca: geography,
        });
      }

      //*************** RANKING ENDED ******************** */
      let total_number_of_houses_by_bedroom_type = [];
      let total_number_of_houses_constructed_by_bedroom_type = [];
      let houses_rental_percentage = [];
      let housing_completion_rental_percentage = [];
      let vacancy_rate = [];
      let cost_of_non_shelter_necessity;
      let median_household_market_income_before_tax;
      let median_household_total_income_before_tax;
      let median_household_total_income_after_tax;
      let affordable_rent_based_on_30_benchmark;
      let all_rent_by_province;
      let chmc_rent;
      await Promise.all(
        bedroom_type_const.map(async (bedroom_type) => {
          const raw_total_number_of_houses_by_bedroom_type =
            await Services.dwellingTypeService.getDetails({
              year,
              province,
              cma: geography_type === "CMA" ? "Y" : "N",
              ca: geography_type === "CA" ? "Y" : "N",
              bedroom_type,
            });
          let renter = 0,
            total = 0,
            owned = 0;
          raw_total_number_of_houses_by_bedroom_type.map((obj) => {
            if (obj.intended_market === "Renter") {
              if (house_type === "Row") {
                renter += obj.row_house;
              } else if (house_type === "Apartment") {
                renter += obj.apartment;
              } else {
                renter += obj.apartment + obj.row_house;
              }
            } else if (obj.intended_market === "Owner") {
              if (house_type === "Row") {
                owned += obj.row_house;
              } else if (house_type === "Apartment") {
                owned += obj.apartment;
              } else {
                owned += obj.apartment + obj.row_house;
              }
            } else if (obj.intended_market === "Total") {
              if (house_type === "Row") {
                total += obj.row_house;
              } else if (house_type === "Apartment") {
                total += obj.apartment;
              } else {
                total += obj.apartment + obj.row_house;
              }
            }
          });
          houses_rental_percentage.push({
            bedroom_type,
            percentage: renter / total,
          });
          total_number_of_houses_by_bedroom_type.push(
            raw_total_number_of_houses_by_bedroom_type
          );
        })
      );

      const raw_total_number_of_houses_constructed_by_bedroom_type =
        await Services.completeHousingService.getDetails({
          year,
          province,
          geography_type,
          geography,
        });
      let renter = 0,
        total = 0,
        owned = 0;
      raw_total_number_of_houses_constructed_by_bedroom_type.map((obj) => {
        if (house_type === obj.house_type || house_type === "Both") {
          if (obj.intended_market === "Rental") {
            renter += obj.units;
          } else if (obj.intended_market === "Homeowner") {
            owned += obj.units;
          } else if (obj.intended_market === "Total") {
            total += obj.units;
          }
        }
      });
      housing_completion_rental_percentage.push({
        bedroom_type,
        percentage: renter / total,
      });
      total_number_of_houses_constructed_by_bedroom_type.push(
        raw_total_number_of_houses_constructed_by_bedroom_type
      );

      await Promise.all(
        bedroom_type_const.map(async (bedroom_type) => {
          let searchObj = {
            year,
            province,
            geography_type,
            geography,
            bedroom_type,
          };
          if (house_type !== "Both") {
            searchObj.house_type = house_type;
          } else {
            searchObj.house_type = {
              [db.sequelize.Op.or]: ["Apartment", "Row"],
            };
          }
          const raw_vacancy_rate = await Services.vacancyRateService.getDetails(
            searchObj
          );
          vacancy_rate.push(raw_vacancy_rate);

          chmc_rent = await Services.rentService.getDetails(searchObj);
          chmc_rent.map((obj) => {
            if (rent_source === "Realistic") {
              obj.rent_value = obj.rent_value * multiplierDetails.rent;
            }
            obj.rent_with_utility = obj.rent_value * multiplierDetails.utility;
            return obj;
          });
        })
      );
      if (source_of_cost_of_non_shelter_necessity === "Average") {
        cost_of_non_shelter_necessity =
          await Services.householdSpendService.getDetails({ province, year });
      } else {
        cost_of_non_shelter_necessity =
          await Services.marketBasketMeasureService.getDetails({
            province,
            year,
          });
      }

      const raw_canada_survey =
        await Services.canadaIncomeSurveyService.getDetails({ province, year });

      median_household_total_income_before_tax =
        raw_canada_survey[0].median_total_before_tax;
      median_household_total_income_after_tax =
        raw_canada_survey[0].median_total_after_tax;

      raw_canada_survey.map((obj) => {
        if (affordability === "30%") {
          obj.rent_value = obj.rent_value / 0.3;
        } else if (affordability === "Residual") {
          obj.rent_value = obj.rent_value + cost_of_non_shelter_necessity;
        }
      });
      affordable_rent_based_on_30_benchmark =
        (median_household_total_income_before_tax / 0.3) * 12;

      all_rent_by_province = await Services.rentService.getDetails({
        province,
        year,
      });
    } catch (error) {
      next(error);
    }
  },
};
