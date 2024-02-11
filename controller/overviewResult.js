const Services = require("../services");
const bedroom_type_const = [
  "0 Bedroom",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom +",
];
const house_type_const = ["Apartment", "Row"];

module.exports = {
  result: async (req, res, next) => {
    try {
      const {
        province,
        rent_source,
        income_before_tax,
        income_after_tax,
        source_of_cost,
      } = req.body;
      const year = "2021";

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
                year: "2021",
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
                  if (rent_source === "Realistic Rent") {
                    rent = Number(
                      Number(multiplierDetails?.rent) *
                        Number(obj.rent_value) *
                        Number(multiplierDetails?.utility)
                    );
                  } else {
                    rent = Number(
                      Number(obj.rent_value) *
                        Number(multiplierDetails?.utility)
                    );
                  }

                  let marketBasketDetails;
                  if (source_of_cost === "Poverty Line Expenses") {
                    marketBasketDetails =
                      await Services.marketBasketMeasureService.getDetail({
                        province,
                        year,
                        cma,
                        ca,
                      });
                  } else {
                    marketBasketDetails =
                      await Services.householdSpendingService.getDetail({
                        province,
                        year,
                        ca,
                        cma,
                      });
                  }

                  const cost_of_non_shelter_necessity =
                    marketBasketDetails?.cost;

                  const residual_income =
                    Number(income_after_tax) - cost_of_non_shelter_necessity;

                  outcome.push({
                    cma,
                    ca,
                    province,
                    bedroom_type,
                    house_type,
                    residual_affordable:
                      Number(residual_income) / 12 > rent ? true : false,
                    household_affordable:
                      rent < (household_income_before_tax * 0.3) / 12
                        ? true
                        : false,
                    optimal_income_after_tax: Number(
                      Number(rent) * 12 + Number(cost_of_non_shelter_necessity)
                    ).toFixed(0),
                    optimal_income_before_tax: Number(
                      (rent * 12) / 0.3
                    ).toFixed(0),
                    income_difference_by_residual: Number(
                      Number(income_after_tax) -
                        (Number(rent) * 12 +
                          Number(cost_of_non_shelter_necessity))
                    ).toFixed(0),
                    income_difference_by_income: Number(
                      household_income_before_tax - (rent * 12) / 0.3
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
      const provinces = await Services.provinceListService.getAllProvinces({});
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
                      if (rent_source === "Realistic Rent") {
                        rent = Number(
                          Number(multiplierDetails?.rent) *
                            Number(obj.rent_value) *
                            Number(multiplierDetails?.utility)
                        );
                      } else {
                        rent = Number(
                          Number(obj.rent_value) *
                            Number(multiplierDetails?.utility)
                        );
                      }

                      let marketBasketDetails;
                      if (source_of_cost === "Poverty Line Expenses") {
                        marketBasketDetails =
                          await Services.marketBasketMeasureService.getDetail({
                            province,
                            year,
                            cma,
                            ca,
                          });
                      } else {
                        marketBasketDetails =
                          await Services.householdSpendingService.getDetail({
                            province,
                            year,
                            ca,
                            cma,
                          });
                      }

                      const cost_of_non_shelter_necessity =
                        marketBasketDetails?.cost;

                      const residual_income =
                        Number(income_after_tax) -
                        cost_of_non_shelter_necessity;

                      all_outcome.push({
                        cma,
                        ca,
                        province,
                        bedroom_type,
                        house_type,
                        residual_affordable:
                          Number(residual_income) / 12 > rent ? true : false,
                        household_affordable:
                          rent < (household_income_before_tax * 0.3) / 12
                            ? true
                            : false,
                        optimal_income_after_tax: Number(
                          Number(rent) * 12 +
                            Number(cost_of_non_shelter_necessity)
                        ).toFixed(0),
                        optimal_income_before_tax: Number(
                          (rent * 12) / 0.3
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
      // return res.json({
      //   province,
      //   rent_source,
      //   income_before_tax,
      //   income_after_tax,
      //   source_of_cost,
      //   all_outcome,
      //   outcome,
      // });
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
