const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");
const bedroom_type_const = [
  "No bedrooms",
  "1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
];
const house_type_const = ["Apartment", "Row"];

module.exports = {
  result: async (req, res, next) => {
    try {
      const { province, rent_source, income_before_tax, income_after_tax } =
        req.body;
      const multiplierDetails = await Services.multiplierDetails.getDetail({
        province,
      });
      const outcome = [];
      const household_income_before_tax = 0.3 * income_before_tax;
      //*********************1st ALGORITHM***************************** */
      await Promise.all(
        bedroom_type_const.map(async (bedroom_type) => {
          await Promise.all(
            house_type_const.map(async (house_type) => {
              const rentDetails = await Services.rentService.getDetail({
                bedroom_type,
                province,
                year: "2022",
                house_type,
              });
              await Promise.all(
                rentDetails.map(async (obj) => {
                  let rent = 0;
                  const { geography, geography_type } = obj;
                  if (rent_source === "Realistic") {
                    rent = Number(multiplierDetails.rent * obj.rent_value);
                  } else {
                    rent = Number(obj.rent_value);
                  }

                  let marketBasketDetails;
                  if (geography_type === "CMA") {
                    marketBasketDetails =
                      await Services.marketBasketMeasureService.getDetail({
                        province,
                        year: 2023,
                        cma: geography,
                      });
                  } else {
                    marketBasketDetails =
                      await Services.marketBasketMeasureService.getDetail({
                        province,
                        year: 2023,
                        ca: geography,
                      });
                  }
                  const cost_of_non_shelter_necessity =
                    marketBasketDetails.cost;
                  const residual_income =
                    income_after_tax - cost_of_non_shelter_necessity;
                  outcome.push({
                    geography,
                    geography_type,
                    province,
                    bedroom_type,
                    house_type,
                    residual_affordable: residual_income > rent ? true : false,
                    household_affordable:
                      rent < household_income_before_tax ? true : false,
                    optimal_income_after_tax:
                      rent + cost_of_non_shelter_necessity,
                    income_surplus_or_deficit_after_tax:
                      income_after_tax - (rent + cost_of_non_shelter_necessity),
                    optimal_income_before_tax: rent / 0.3,
                    income_surplus_or_deficit_before_tax:
                      income_after_tax - rent / 0.3,
                  });
                })
              );
            })
          );
        })
      );
      //*********************END 1st ALGORITHM************************* */

      //*********************2nd ALGORITHM***************************** */
      const provinces = await Services.rankingService.getAllProvinces();
      const all_outcome = [];
      await Promise.all(
        provinces.map(async (province) => {
          await Promise.all(
            bedroom_type_const.map(async (bedroom_type) => {
              await Promise.all(
                house_type_const.map(async (house_type) => {
                  const rentDetails = await Services.rentService.getDetails({
                    bedroom_type,
                    province,
                    house_type,
                    year: "2022",
                  });
                  await Promise.all(
                    rentDetails.map(async (obj) => {
                      let rent = 0;
                      const { geography, geography_type } = obj;
                      if (rent_source === "Realistic") {
                        rent = Number(multiplierDetails.rent * obj.rent_value);
                      } else {
                        rent = Number(obj.rent_value);
                      }
                      let marketBasketDetails;
                      if (geography_type === "CMA") {
                        marketBasketDetails =
                          await Services.marketBasketMeasureService.getDetails({
                            province,
                            year: 2023,
                            cma: geography,
                          });
                      } else {
                        marketBasketDetails =
                          await Services.marketBasketMeasureService.getDetails({
                            province,
                            year: 2023,
                            ca: geography,
                          });
                      }
                      const cost_of_non_shelter_necessity =
                        marketBasketDetails.cost;
                      const residual_income =
                        income_after_tax - cost_of_non_shelter_necessity;
                      all_outcome.push({
                        geography,
                        geography_type,
                        province,
                        bedroom_type,
                        house_type,
                        residual_affordable:
                          residual_income > rent ? true : false,
                        household_affordable:
                          rent < household_income_before_tax ? true : false,
                        optimal_income_after_tax:
                          rent + cost_of_non_shelter_necessity,
                        income_surplus_or_deficit_after_tax:
                          income_after_tax -
                          (rent + cost_of_non_shelter_necessity),
                        optimal_income_before_tax: rent / 0.3,
                        income_surplus_or_deficit_before_tax:
                          income_after_tax - rent / 0.3,
                      });
                    })
                  );
                })
              );
            })
          );
        })
      );
      //*********************END 2nd ALGORITHM***************************/
    } catch (error) {
      next(error);
    }
  },
};
