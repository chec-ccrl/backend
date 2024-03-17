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
        geography,
        year,
        affordability,
        source_of_cost_of_non_shelter_necessity,
        house_type,
        rent_source,
      } = req.body;
      let cma = null;
      let ca = null;
      let cma_ca_list = await Services.multiplierService.getAllFr({
        province,
        year,
        cma: geography,
      });

      if (cma_ca_list.result.length === 0) {
        ca = geography;
        cma = "NA";
      } else {
        cma = geography;
        ca = "NA";
      }
      let affordability_ranking;

      if (ca !== "NA") {
        affordability_ranking = await Services.rentalRankingCAService.getDetail(
          {
            year: Number(year),
            ca,
          }
        );
      } else {
        affordability_ranking =
          await Services.rentalRankingCMAService.getDetail({
            year: Number(year),
            cma,
          });
      }
      const province_income_ranking =
        await Services.incomeRankingProvinceService.getDetail({
          year,
          province,
        });
      let cma_income_ranking = null;
      if (cma !== "NA") {
        cma_income_ranking = await Services.incomeRankingCMAService.getDetail({
          year: Number(year),
          province,
          cma,
        });
      }

      const allRentDetails = await Services.rentService.getAlls({
        year,
      });
      const allRentCMAApartment = {};
      const allRentCMABoth = {};
      const allRentCMARow = {};
      const allRentCAApartment = {};
      const allRentCARow = {};
      const allRentCABoth = {};
      allRentDetails.map((ele) => {
        const { cma, ca, rent_value } = ele;
        const inside_house_type = ele.house_type;
        if (cma !== "NA" && ca === "NA") {
          if (house_type === "Row House") {
            if (inside_house_type === "Row") {
              if (allRentCMARow[cma]) {
                allRentCMARow[cma] += rent_value;
              } else {
                allRentCMARow[cma] = rent_value;
              }
            }
          } else if (house_type === "Apartment") {
            if (inside_house_type === "Apartment") {
              if (allRentCMAApartment[cma]) {
                allRentCMAApartment[cma] += rent_value;
              } else {
                allRentCMAApartment[cma] = rent_value;
              }
            }
          } else {
            if (allRentCMABoth[cma]) {
              allRentCMABoth[cma] += rent_value;
            } else {
              allRentCMABoth[cma] = rent_value;
            }
          }
        } else if (cma === "NA" && ca !== "NA") {
          if (house_type === "Row House") {
            if (inside_house_type === "Row") {
              if (allRentCARow[ca]) {
                allRentCARow[ca] += rent_value;
              } else {
                allRentCARow[ca] = rent_value;
              }
            }
          } else if (house_type === "Apartment") {
            if (inside_house_type === "Apartment") {
              if (allRentCAApartment[ca]) {
                allRentCAApartment[ca] += rent_value;
              } else {
                allRentCAApartment[ca] = rent_value;
              }
            }
          } else {
            if (allRentCABoth[ca]) {
              allRentCABoth[ca] += rent_value;
            } else {
              allRentCABoth[ca] = rent_value;
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
      const sortedAllRentCABoth = Object.entries(allRentCABoth).sort(
        (a, b) => a[1] - b[1]
      );
      const sortedAllRentCMABoth = Object.entries(allRentCMABoth).sort(
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

      const top5LowestAllRentCABoth = sortedAllRentCABoth.slice(0, 5);
      const top5HighestAllRentCABoth = sortedAllRentCABoth.slice(-5).reverse();
      const top5LowestAllRentCMABoth = sortedAllRentCMABoth.slice(0, 5);
      const top5HighestAllRentCMABoth = sortedAllRentCMABoth
        .slice(-5)
        .reverse();

      let highestcma, lowestcma, highestca, lowestca;
      if (house_type === "Row House") {
        highestcma = top5HighestAllRentCMARow;
        lowestcma = top5LowestAllRentCMARow;
        highestca = top5HighestAllRentCARow;
        lowestca = top5LowestAllRentCARow;
      } else if (house_type === "Apartment") {
        highestcma = top5HighestAllRentCMAApartment;
        lowestcma = top5LowestAllRentCMAApartment;
        highestca = top5HighestAllRentCAApartment;
        lowestca = top5LowestAllRentCAApartment;
      } else {
        highestcma = top5HighestAllRentCMABoth;
        lowestcma = top5LowestAllRentCMABoth;
        highestca = top5HighestAllRentCABoth;
        lowestca = top5LowestAllRentCABoth;
      }
      let c27l = [];
      let c27v = [];
      highestcma.map((ele) => {
        c27l.push(`"${ele[0]}"`);
        c27v.push(Math.ceil(ele[1] / 4));
      });

      let c28l = [];
      let c28v = [];
      lowestcma.map((ele) => {
        c28l.push(`"${ele[0]}"`);
        c28v.push(Math.ceil(ele[1] / 4));
      });

      let c35l = [];
      let c35v = [];
      highestca.map((ele) => {
        c35l.push(`"${ele[0]}"`);
        c35v.push(Math.ceil(ele[1] / 4));
      });

      let c36l = [];
      let c36v = [];
      lowestca.map((ele) => {
        c36l.push(`"${ele[0]}"`);
        c36v.push(Math.ceil(ele[1] / 4));
      });

      const multiplier = await Services.multiplierService.getDetail({
        province,
        cma,
        ca,
        year,
      });

      let rentObj = {
        province,
        cma,
        ca,
        year,
      };

      let rentDetails = await Services.rentService.getAlls(rentObj);
      let current_shelter_cost = 0;

      rentDetails.forEach((ele) => {
        if (rent_source === "Average Listing Rent") {
          ele.rent_value = Math.ceil(ele.rent_value * multiplier?.rent);
        }
        ele.dataValues.shelter_cost = Math.ceil(
          ele.rent_value * multiplier?.utility
        );
        current_shelter_cost += ele.shelter_cost;
      });

      //*************** START 1.15 & 1.17 ************************** */
      current_shelter_cost = current_shelter_cost / rentDetails.length;
      //*************** END 1.15 & 1.17 ************************** */

      let arrYear = [];
      for (let i = 0; i < 6; i += 1) {
        arrYear.push(String(Number(year) - i));
      }
      //*************** START 4.2 ************************** */
      let historicalGrowthRow = {};
      let historicalGrowthApartment = {};
      //*************** END 4.2 ************************** */

      //*************** START 3.2 & 3.4 ************************** */
      let median_household_income_after_tax_6_year = {};
      let median_household_income_before_tax_6_year = {};
      //*************** END 3.2 & 3.4 ************************** */
      await Promise.all(
        arrYear.map(async (year) => {
          const rentDetailsRow = await Services.rentService.getAlls({
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

          const rentDetailsApa = await Services.rentService.getAlls({
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
            await Services.canadaIncomeSurveyService.getAlls({
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
      let median_household_income_after_tax_6_year_v = [];
      Object.keys(median_household_income_after_tax_6_year).map((key) => {
        median_household_income_after_tax_6_year_v.push(
          median_household_income_after_tax_6_year[key]
        );
      });
      let median_household_income_before_tax_6_year_v = [];
      Object.keys(median_household_income_before_tax_6_year).map((key) => {
        median_household_income_before_tax_6_year_v.push(
          median_household_income_before_tax_6_year[key]
        );
      });

      const growthRowData = {};
      let previousValue = null;

      for (const year in historicalGrowthRow) {
        if (previousValue === null) {
          // For the first year, set growth percentage to 0
          growthRowData[year] = 0;
        } else {
          // Calculate growth percentage
          const growthPercentage =
            ((historicalGrowthRow[year] - previousValue) / previousValue) * 100;
          growthRowData[year] = Number(growthPercentage.toFixed(1));
        }
        previousValue = historicalGrowthRow[year];
      }

      const growthApartmentData = {};
      let previousValuee = null;

      for (const year in historicalGrowthApartment) {
        if (previousValuee === null) {
          // For the first year, set growth percentage to 0
          growthApartmentData[year] = 0;
        } else {
          // Calculate growth percentage
          const growthPercentage =
            ((historicalGrowthApartment[year] - previousValuee) /
              previousValuee) *
            100;
          growthApartmentData[year] = Number(growthPercentage.toFixed(1));
        }
        previousValuee = historicalGrowthApartment[year];
      }

      let historicalGrowthRowFinal = [];
      Object.keys(growthRowData).map((key) => {
        historicalGrowthRowFinal.push(growthRowData[key]);
      });
      let historicalGrowthApartmentFinal = [];
      Object.keys(growthApartmentData).map((key) => {
        historicalGrowthApartmentFinal.push(growthApartmentData[key]);
      });

      const link = await Services.pdfService.detailPdfGenerator({
        province,
        geography,
        year,
        rent_source,
        house_type,
        affordability,
        source_of_cost_of_non_shelter_necessity,
        affordability_ranking,
        province_income_ranking,
        cma_income_ranking,
        cma,
        ca,
        c27l,
        c27v,
        c28l,
        c28v,
        c35l,
        c35v,
        c36l,
        c36v,
        rentDetails,
        median_household_income_before_tax_6_year_v,
        median_household_income_after_tax_6_year_v,
        historicalGrowthRowFinal,
        historicalGrowthApartmentFinal,
      });

      return res.json(link);

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

      //*************** START NO MARKING AVAILABLE ************************** */
      const affordability_rent_based_30_benchmarch =
        (median_household_income_before_tax * 0.3) / 12;

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
      const { province, year } = req.query;
      const cma_ca_list = await Services.multiplierService.getAllFr({
        province,
        year: Number(year),
      });
      return res.status(200).json({ result: cma_ca_list });
    } catch (error) {
      next(error);
    }
  },
};
