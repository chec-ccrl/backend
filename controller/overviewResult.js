const ErrorHandler = require("../util/error");
const Services = require("../services");
const Validations = require("../validations");
const logger = require("../util/logger");
const db = require("../models");
const bedroom_type_const = [
  "0 Bedroom",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom+",
];
const house_type_const = ["Apartment", "Row"];

module.exports = {
  result: async (req, res, next) => {
    try {
      const {
        province,
        year,
        rent_source,
        income_before_tax,
        income_after_tax,
        source_of_cost,
      } = req.body;

      const outcome = [];
      const household_income_before_tax = income_before_tax;
      //*********************1st ALGORITHM***************************** */
      await Promise.all(
        bedroom_type_const.map(async (bedroom_type) => {
          await Promise.all(
            house_type_const.map(async (house_type) => {
              const rentDetails = await Services.rentService.getDetails({
                bedroom_type,
                province,
                year: String(year),
                house_type,
              });
              await Promise.all(
                rentDetails.map(async (obj) => {
                  let rent = 0;
                  const { cma, ca } = obj;
                  const multiplierDetails =
                    await Services.multiplierService.getDetail({
                      province,
                      year,
                      cma,
                      ca,
                    });

                  if (rent_source === "Realistic") {
                    rent = Number(
                      (multiplierDetails?.rent ?? 1000) *
                        obj.rent_value *
                        (multiplierDetails?.utility ?? 1)
                    );
                  } else {
                    rent = Number(
                      obj.rent_value * (multiplierDetails?.utility ?? 1)
                    );
                  }

                  let marketBasketDetails;
                  if (source_of_cost === "Poverty") {
                    if (cma !== "NA") {
                      marketBasketDetails =
                        await Services.marketBasketMeasureService.getDetail({
                          province,
                          year,
                          cma,
                        });
                    } else {
                      marketBasketDetails =
                        await Services.marketBasketMeasureService.getDetail({
                          province,
                          year,
                          ca,
                        });
                    }
                  } else {
                    if (cma !== "NA") {
                      marketBasketDetails =
                        await Services.householdSpendingService.getDetail({
                          province,
                          year,
                          cma,
                        });
                    } else {
                      marketBasketDetails =
                        await Services.householdSpendingService.getDetail({
                          province,
                          year,
                          ca,
                        });
                    }
                  }

                  const cost_of_non_shelter_necessity =
                    marketBasketDetails?.cost;
                  const residual_income =
                    income_after_tax - cost_of_non_shelter_necessity;
                  outcome.push({
                    cma,
                    ca,
                    province,
                    bedroom_type,
                    house_type,
                    residual_affordable:
                      residual_income / 12 > rent ? true : false,
                    household_affordable:
                      rent < (household_income_before_tax * 0.3) / 12
                        ? true
                        : false,
                    optimal_income_after_tax: Number(
                      rent + cost_of_non_shelter_necessity
                    ).toFixed(0),
                    optimal_income_before_tax: Number(rent / 0.3).toFixed(0),
                    income_difference_by_residual: Number(
                      household_income_before_tax -
                        (rent + cost_of_non_shelter_necessity)
                    ).toFixed(0),
                    income_difference_by_income: Number(
                      income_after_tax - rent / 0.3
                    ).toFixed(0),
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
          province = province.province;
          await Promise.all(
            bedroom_type_const.map(async (bedroom_type) => {
              await Promise.all(
                house_type_const.map(async (house_type) => {
                  const rentDetails = await Services.rentService.getDetails({
                    bedroom_type,
                    province,
                    house_type,
                    year: String(year),
                  });
                  await Promise.all(
                    rentDetails.map(async (obj) => {
                      let rent = 0;
                      const { cma, ca } = obj;
                      const multiplierDetails =
                        await Services.multiplierService.getDetail({
                          province,
                          year,
                          cma,
                          ca,
                        });
                      if (rent_source === "Realistic") {
                        rent = Number(
                          (multiplierDetails?.rent ?? 1000) *
                            obj.rent_value *
                            (multiplierDetails?.utility ?? 1)
                        );
                      } else {
                        rent = Number(
                          obj.rent_value * (multiplierDetails?.utility ?? 1)
                        );
                      }
                      let marketBasketDetails;
                      if (source_of_cost === "Poverty") {
                        if (cma !== "NA") {
                          marketBasketDetails =
                            await Services.marketBasketMeasureService.getDetail(
                              {
                                province,
                                year,
                                cma,
                              }
                            );
                        } else {
                          marketBasketDetails =
                            await Services.marketBasketMeasureService.getDetail(
                              {
                                province,
                                year,
                                ca,
                              }
                            );
                        }
                      } else {
                        if (cma !== "NA") {
                          marketBasketDetails =
                            await Services.householdSpendingService.getDetail({
                              province,
                              year,
                              cma,
                            });
                        } else {
                          marketBasketDetails =
                            await Services.householdSpendingService.getDetail({
                              province,
                              year,
                              ca,
                            });
                        }
                      }
                      const cost_of_non_shelter_necessity =
                        marketBasketDetails?.cost ?? 10000;
                      const residual_income =
                        income_after_tax - cost_of_non_shelter_necessity;
                      all_outcome.push({
                        cma,
                        ca,
                        province,
                        bedroom_type,
                        house_type,
                        residual_affordable:
                          residual_income / 12 > rent ? true : false,
                        household_affordable:
                          rent < (household_income_before_tax * 0.3) / 12
                            ? true
                            : false,
                        optimal_income_after_tax: Number(
                          rent + cost_of_non_shelter_necessity
                        ).toFixed(0),
                        optimal_income_before_tax: Number(rent / 0.3).toFixed(
                          0
                        ),
                        income_difference_by_residual: Number(
                          household_income_before_tax -
                            (rent + cost_of_non_shelter_necessity)
                        ).toFixed(0),
                        income_difference_by_income: Number(
                          income_after_tax - rent / 0.3
                        ).toFixed(0),
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
      const link = await Services.pdfService.simplePdfGenerator({
        province,
        rent_source,
        income_before_tax,
        income_after_tax,
        source_of_cost,
        all_outcome,
        outcome,
      });
      return res.json(link);
    } catch (error) {
      next(error);
    }
  },
};
