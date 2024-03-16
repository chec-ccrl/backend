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
      const link = await Services.pdfService.detailPdfGenerator({});
      return res.json(link);
      const {
        province,
        cma,
        ca,
        year,
        affordability,
        source_of_cost_of_non_shelter_necessity,
        house_type,
        rent_source,
      } = req.body;

      const multiplier = await Services.multiplierService.getDetails({
        province,
        cma,
        ca,
        year,
      });

      let marketBasketDetails;
      if (source_of_cost_of_non_shelter_necessity === "Poverty Line Expenses") {
        marketBasketDetails =
          await Services.marketBasketMeasureService.getDetail({
            province,
            year,
            cma,
            ca,
          });
      } else {
        marketBasketDetails = await Services.householdSpendingService.getDetail(
          {
            province,
            year,
            ca,
            cma,
          }
        );
      }

      //*************** START 1.15 ************************** */
      const cost_of_non_shelter_necessity = marketBasketDetails?.cost;
      //*************** END 1.15 ************************** */

      const canadaIncomeSurveyDetails =
        await Services.canadaIncomeSurveyService.getAll({
          province,
          year,
          cma,
          ca,
        });
      //*************** START 1.15 & 1.13 ************************** */
      const median_household_income_before_tax =
        canadaIncomeSurveyDetails?.[0]?.median_before_tax;
      const median_household_income_after_tax =
        canadaIncomeSurveyDetails?.[0]?.median_after_tax;
      //*************** END 1.15 & 1.13 ************************** */

      let rentObj = {
        province,
        cma,
        ca,
        year,
      };

      if (house_type === "Row House") {
        rentObj.house_type = "Row";
      } else if (house_type === "Apartment") {
        rentObj.house_type = "Apartment";
      }

      const rentDetails = await Services.rentService.getAll(rentObj);

      const current_shelter_cost = 0;

      await Promise.all(
        rentDetails.map((ele) => {
          if (rent_source === "CHMC") {
            ele.rent_value = ele.rent_value * multiplier?.rent;
          }
          ele.shelter_cost = ele.rent_value * multiplier?.utility;
          current_shelter_cost += ele.shelter_cost;
        })
      );
      //*************** START 1.15 & 1.17 ************************** */
      current_shelter_cost = current_shelter_cost / rentDetails.length;
      //*************** END 1.15 & 1.17 ************************** */

      const allRentDetails = await Services.rentService.getAll({
        year,
      });
      const allRentCMAApartment = {};
      const allRentCMARow = {};
      const allRentCAApartment = {};
      const allRentCARow = {};
      allRentDetails.map((ele) => {
        const { cma, ca, rent_value, house_type } = ele;
        if (cma !== "NA") {
          if (house_type === "Row") {
            if (allRentCMARow[cma]) {
              allRentCMARow[cma] += rent_value;
            } else {
              allRentCMARow[cma] = rent_value;
            }
          } else {
            if (allRentCMAApartment[cma]) {
              allRentCMAApartment[cma] += rent_value;
            } else {
              allRentCMAApartment[cma] = rent_value;
            }
          }
        } else {
          if (house_type === "Row") {
            if (allRentCARow[ca]) {
              allRentCARow[ca] += rent_value;
            } else {
              allRentCARow[ca] = rent_value;
            }
          } else {
            if (allRentCAApartment[ca]) {
              allRentCAApartment[ca] += rent_value;
            } else {
              allRentCAApartment[ca] = rent_value;
            }
          }
        }
      });
      const sortedAllRentCMAApartment = Object.entries(
        allRentCMAApartment
      ).sort((a, b) => a[1] - b[1]);
      const sortedAllRentCMARow = Object.entries(allRentCMARow).sort(
        (a, b) => a[1] - b[1]
      );
      const sortedAllRentCAApartment = Object.entries(allRentCAApartment).sort(
        (a, b) => a[1] - b[1]
      );
      const sortedAllRentCARow = Object.entries(allRentCARow).sort(
        (a, b) => a[1] - b[1]
      );

      //*************** START 4.4 & 4.5 ************************** */
      const top5LowestAllRentCMAApartment = sortedAllRentCMAApartment.slice(
        0,
        5
      );
      const top5HighestAllRentCMAApartment = sortedAllRentCMAApartment
        .slice(-5)
        .reverse();

      const top5LowestAllRentCMARow = sortedAllRentCMARow.slice(0, 5);
      const top5HighestAllRentCMARow = sortedAllRentCMARow.slice(-5).reverse();

      const top5LowestAllRentCAApartment = sortedAllRentCAApartment.slice(0, 5);
      const top5HighestAllRentCAApartment = sortedAllRentCAApartment
        .slice(-5)
        .reverse();

      const top5LowestAllRentCARow = sortedAllRentCARow.slice(0, 5);
      const top5HighestAllRentCARow = sortedAllRentCARow.slice(-5).reverse();

      //*************** END 4.4 & 4.5 ************************** */

      let arrYear = [];
      for (let i = 0; i < 6; i += 1) {
        arrYear.push(Number(year) - i);
      }
      //*************** START 4.2 ************************** */
      const historicalGrowthRow = {};
      const historicalGrowthApartment = {};
      //*************** END 4.2 ************************** */

      //*************** START 3.2 & 3.4 ************************** */
      const median_household_income_after_tax_6_year = {};
      const median_household_income_before_tax_6_year = {};
      //*************** END 3.2 & 3.4 ************************** */
      await Promise.all(
        arrYear.map(async (year) => {
          const rentDetailsRow = await Services.rentService.getAll({
            province,
            cma,
            ca,
            year,
            house_type: "Row",
          });
          let rowval = 0;
          rentDetailsRow.map((ele) => {
            rowval += ele.rent_value;
          });
          rowval = rowval / rentDetailsRow.length;

          const rentDetailsApa = await Services.rentService.getAll({
            province,
            cma,
            ca,
            year,
            house_type: "Apartment",
          });
          let apaval = 0;
          rentDetailsApa.map((ele) => {
            apaval += ele.rent_value;
          });
          apaval = apaval / rentDetailsApa.length;
          historicalGrowthApartment[String(year)] = apaval;
          historicalGrowthRow[String(year)] = rowval;

          const canadaIncomeSurveyDetails =
            await Services.canadaIncomeSurveyService.getAll({
              province,
              year,
              cma,
              ca,
            });
          median_household_income_after_tax_6_year[String(year)] =
            canadaIncomeSurveyDetails?.[0]?.median_after_tax;
          median_household_income_before_tax_6_year[String(year)] =
            canadaIncomeSurveyDetails?.[0]?.median_before_tax;
        })
      );
      //*************** START NO MARKING AVAILABLE ************************** */
      const affordability_rent_based_30_benchmarch =
        (median_household_income_before_tax * 0.3) / 12;
      //*************** END NO MARKING AVAILABLE ************************** */

      //*************** START 1.3 & 3.3 ************************** */
      const province_income_ranking =
        await Services.incomeRankingProvinceService.getDetail({
          year,
          province,
        });
      //*************** END 1.3 & 3.3 ************************** */

      //*************** END START ************************** */
      let affordability_ranking;

      if (ca !== "NA") {
        affordability_ranking = await Services.rentalRankingCAService.getDetail(
          {
            year,
            ca,
          }
        );
      } else {
        affordability_ranking =
          await Services.rentalRankingCMAService.getDetail({
            year,
            cma,
          });
      }
      //*************** END 1.1 ************************** */

      const dwellingDetails = await Services.dwellingTypeService.getAll({
        province,
        year,
        cma,
        ca,
      });
      let rowTotal = 0;
      let apartmentTotal = 0;

      dwellingDetails.map((ele) => {
        if (ele.house_type === "Apartment") {
          apartmentTotal += ele.units;
        } else {
          rowTotal += ele.units;
        }
      });
      dwellingDetails.map((ele) => {
        if (ele.house_type === "Apartment") {
          ele.bedroom_percentage = ele.units / apartmentTotal;
        } else {
          ele.bedroom_percentage = ele.units / rowTotal;
        }
      });

      const completeHousing = await Services.completeHousingService.getAll({
        province,
        year,
        cma,
        ca,
      });
      let comrow = 0;
      let comapa = 0;
      let comTotalrow = 0;
      let comTotalapa = 0;
      completeHousing.map(async (house) => {
        if (
          house.intended_market === "Rental" &&
          house.house_type === "Apartment"
        ) {
          comapa += house.units;
        } else if (
          house.intended_market === "Rental" &&
          house.house_type === "Row"
        ) {
          comrow += house.units;
        } else if (
          house.intended_market === "Total" &&
          house.house_type === "Row"
        ) {
          comTotalrow += house.units;
        } else if (
          house.intended_market === "Total" &&
          house.house_type === "Apartment"
        ) {
          comTotalapa += house.units;
        }
        dwellingDetails.map((dwelling) => {
          if (
            dwelling.house_type === house.house_type &&
            house.intended_market === "Total"
          ) {
            dwelling.total_house_constructed =
              house.units * dwelling.bedroom_percentage;
            dwelling.total_houses = house.units;
          }
          if (
            dwelling.house_type === house.house_type &&
            house.intended_market === "Rental"
          ) {
            dwelling.rental_house_constructed =
              house.units * dwelling.bedroom_percentage;
            dwelling.rental_houses = house.units;
          }
          if (
            dwelling.house_type === house.house_type &&
            house.intended_market === "Owned"
          ) {
            dwelling.owned_house_constructed =
              house.units * dwelling.bedroom_percentage;
            dwelling.owned_houses = house.units;
          }
        });
      });

      const rental_percentage_of_row_houses = (comrow / comTotalrow) * 100;
      const rental_percentage_of_apartment_houses =
        (comapa / comTotalapa) * 100;

      await Promise.all(
        dwellingDetails.map(async (ele) => {
          const vacancyRate = await Services.vacancyRateService.getDetail({
            province,
            cma,
            ca,
            year,
            bedroom_type: ele.bedroom_type,
            house_type: ele.house_type,
          });
          ele.vacancy_rate = vacancyRate.vacancy_rate;
        })
      );

      rentDetails.map((obj) => {
        dwellingDetails.map((ele) => {
          if (
            ele.house_type === obj.house_type &&
            ele.bedroom_type === obj.bedroom_type
          ) {
            ele.rent_value = obj.rent_value;
            ele.shelter_cost = obj.shelter_cost;
          }
        });
      });

      dwellingDetails.map((ele) => {
        if (affordability === "30%" || affordability === "Both") {
          ele.chmc_house_affordable =
            ele.rent_value < (0.3 * median_household_income_before_tax) / 12
              ? true
              : false;
        }
        if (affordability === "Residual" || affordability === "Both") {
          ele.residual_house_affordable =
            (median_household_income_after_tax -
              cost_of_non_shelter_necessity) /
              12 >
            ele.rent_value
              ? true
              : false;
        }
      });
    } catch (error) {
      next(error);
    }
  },
  getGeo: async (req, res, next) => {
    try {
      const { province } = req.query;
      const cma_ca_list = await Services.multiplierService.getAllFr({
        province,
        year: 2021,
      });
      return res.status(200).json({ result: cma_ca_list });
    } catch (error) {
      next(error);
    }
  },
};
