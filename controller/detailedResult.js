const Services = require("../services");

const provincesMap = new Map([
  ["Newfoundland And Labrador", "NL"],
  ["Prince Edward Island", "PE"],
  ["Nova Scotia", "NS"],
  ["New Brunswick", "NB"],
  ["Quebec", "QC"],
  ["Ontario", "ON"],
  ["Manitoba", "MB"],
  ["Saskatchewan", "SK"],
  ["Alberta", "AB"],
  ["British Columbia", "BC"],
  ["Yukon", "YT"],
  ["Northwest Territories", "NT"],
  ["Nunavut", "NU"],
]);

function findRank(name, listing) {
  let rank = 1;
  for (let i = 0; i < listing.length; i++) {
    if (listing[i].geography === name) {
      return rank;
    }
    rank++;
  }
  return -1; // Return -1 if name is not found
}

function calculateCAGR(values) {
  // Check if there are enough values to calculate CAGR
  if (values.length < 2) {
    return null; // Return null if there are insufficient data points
  }

  // Calculate the number of years
  const numYears = values.length - 1;

  // Calculate the CAGR formula: ((End Value / Start Value)^(1 / numYears)) - 1
  const startValue = values[0];
  const endValue = values[values.length - 1];
  const cagr = Math.pow(endValue / startValue, 1 / numYears) - 1;

  // Convert CAGR to percentage
  const cagrPercentage = cagr * 100;

  return cagrPercentage;
}

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
        cma = "Na";
      } else {
        cma = geography;
        ca = "Na";
      }
      let affordability_ranking;

      if (ca !== "Na") {
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
      if (cma !== "Na") {
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
        if (cma !== "Na" && ca === "Na") {
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
        } else if (cma === "Na" && ca !== "Na") {
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
      const cost_of_non_shelter_necessity = marketBasketDetails?.cost;

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
          ele.rent_value = ele.rent_value * multiplier?.rent;
        }
        ele.rent_value = Math.ceil(ele.rent_value * multiplier?.utility);
        if (house_type === "Apartment & Row House") {
          current_shelter_cost += ele.rent_value;
        } else if (house_type === "Row House" && ele.house_type === "Row") {
          current_shelter_cost += ele.rent_value;
        } else if (
          house_type === "Apartment" &&
          ele.house_type === "Apartment"
        ) {
          current_shelter_cost += ele.rent_value;
        }
      });
      current_shelter_cost = current_shelter_cost / 4;
      let rentDetails2 = await Services.rentService.getAlls(rentObj);
      rentDetails2.forEach((ele) => {
        if (rent_source === "Average Listing Rent") {
          ele.rent_value = Math.ceil(ele.rent_value * multiplier?.rent);
        }
      });
      let arrYear = [];
      for (let i = 0; i < 6; i += 1) {
        arrYear.push(String(Number(year) - i));
      }
      arrYear.reverse();
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
          rowval = rowval / 4;

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
          apaval = apaval / 4;
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
          const rentDetailsRow = await Services.rentService.getAlls({
            province,
            cma,
            ca,
            year: String(Number(year) - 1),
            house_type: "Row",
          });
          let rowval = 0;
          rentDetailsRow.map((ele) => {
            rowval += ele.rent_value;
          });
          rowval = rowval / 4;
          const growthPercentage =
            ((historicalGrowthRow[year] - rowval) / rowval) * 100;
          growthRowData[year] = Number(growthPercentage.toFixed(1));
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
          const rentDetailsRow = await Services.rentService.getAlls({
            province,
            cma,
            ca,
            year: String(Number(year) - 1),
            house_type: "Apartment",
          });
          let rowval = 0;
          rentDetailsRow.map((ele) => {
            rowval += ele.rent_value;
          });
          rowval = rowval / 4;
          const growthPercentage =
            ((historicalGrowthApartment[year] - rowval) / rowval) * 100;
          growthApartmentData[year] = Number(growthPercentage.toFixed(1));
          // For the first year, set growth percentage to 0
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

      const canadaIncomeSurveyDetails =
        await Services.canadaIncomeSurveyService.getAlls({
          province,
          year,
          cma,
          ca,
        });

      const median_household_income_after_tax =
        canadaIncomeSurveyDetails?.[0]?.median_after_tax;
      const median_household_income_before_tax =
        canadaIncomeSurveyDetails?.[0]?.median_before_tax / 1000;

      const dwellingDetails = await Services.dwellingTypeService.getAlls({
        province,
        year,
        cma,
        ca,
      });
      let rowTotal = 0;
      let apartmentTotal = 0;
      let rowTotalAva = 0;
      let apartmentTotalAva = 0;
      let rowTotalAdded = 0;
      let apartmentTotalAdded = 0;

      dwellingDetails.map((ele) => {
        if (ele.house_type === "Apartment") {
          apartmentTotal += ele.units;
        } else {
          rowTotal += ele.units;
        }
      });
      let dwellingDetailsa = [];
      dwellingDetails.map((ele) => {
        let bedroom_percentage = 0;
        if (ele.house_type === "Apartment") {
          bedroom_percentage = ele.units / apartmentTotal;
        } else {
          bedroom_percentage = ele.units / rowTotal;
        }
        dwellingDetailsa.push({
          ...ele.dataValues,
          bedroom_percentage: Number(bedroom_percentage),
        });
      });
      let house_constructed_all_row = 0;
      let house_constructed_rental_row = 0;
      let house_constructed_owned_row = 0;
      let house_constructed_all_apa = 0;
      let house_constructed_rental_apa = 0;
      let house_constructed_owned_apa = 0;
      let dwellingDetailss = [];
      let apaUnitsAva = [0, 0, 0, 0];
      let rowUnitsAva = [0, 0, 0, 0];
      let apaUnitsAdded = [0, 0, 0, 0];
      let rowUnitsAdded = [0, 0, 0, 0];
      let bool1 = false,
        bool2 = false;
      await Promise.all(
        dwellingDetailsa.map(async (ele) => {
          const vacancyRate = await Services.vacancyRateService.getDetail({
            province,
            cma,
            ca,
            year,
            bedroom_type: ele.bedroom_type,
            house_type: ele.house_type,
          });

          const completeHousing =
            await Services.completeHousingService.getDetail({
              province,
              cma,
              ca,
              year: Number(year),
              intended_market: "All",
              house_type: ele.house_type,
            });

          const completeHousing2 =
            await Services.completeHousingService.getDetail({
              province,
              cma,
              ca,
              year: Number(year),
              intended_market: "Rental",
              house_type: ele.house_type,
            });
          const completeHousing3 =
            await Services.completeHousingService.getDetail({
              province,
              cma,
              ca,
              year: Number(year),
              intended_market: "Owner",
              house_type: ele.house_type,
            });
          if (ele.house_type === "Row" && !bool1) {
            bool1 = true;
            house_constructed_all_row += completeHousing.units;
            house_constructed_rental_row += completeHousing2.units;
            house_constructed_owned_row += completeHousing3.units;
          } else if (!bool2) {
            bool2 = true;
            house_constructed_all_apa += completeHousing.units;
            house_constructed_rental_apa += completeHousing2.units;
            house_constructed_owned_apa += completeHousing3.units;
          }
          let obj = {
            ...ele,
            vacancy_rate: vacancyRate.vacancy_rate,
            house_constructed_rental: Math.ceil(
              completeHousing?.units * ele.bedroom_percentage
            ),
            house_constructed_all: Math.ceil(
              completeHousing2?.units * ele.bedroom_percentage
            ),
            house_constructed_owned: Math.ceil(
              completeHousing3?.units * ele.bedroom_percentage
            ),
            rental_percentage: Math.ceil(
              completeHousing2?.units / completeHousing?.units
            ),
          };
          dwellingDetailss.push(obj);
          if (ele.bedroom_type === "0 Bedroom" && ele.house_type === "Row") {
            rowUnitsAdded[0] = obj.house_constructed_all;
            rowUnitsAva[0] = ele.units;
          } else if (
            ele.bedroom_type === "1 Bedroom" &&
            ele.house_type === "Row"
          ) {
            rowUnitsAdded[1] = obj.house_constructed_all;
            rowUnitsAva[1] = ele.units;
          } else if (
            ele.bedroom_type === "2 Bedroom" &&
            ele.house_type === "Row"
          ) {
            rowUnitsAdded[2] = obj.house_constructed_all;
            rowUnitsAva[2] = ele.units;
          } else if (ele.house_type === "Row") {
            rowUnitsAdded[3] = obj.house_constructed_all;
            rowUnitsAva[3] = ele.units;
          }
          if (
            ele.bedroom_type === "0 Bedroom" &&
            ele.house_type === "Apartment"
          ) {
            apaUnitsAdded[0] = obj.house_constructed_all;
            apaUnitsAva[0] = ele.units;
          } else if (
            ele.bedroom_type === "1 Bedroom" &&
            ele.house_type === "Apartment"
          ) {
            apaUnitsAdded[1] = obj.house_constructed_all;
            apaUnitsAva[1] = ele.units;
          } else if (
            ele.bedroom_type === "2 Bedroom" &&
            ele.house_type === "Apartment"
          ) {
            apaUnitsAdded[2] = obj.house_constructed_all;
            apaUnitsAva[2] = ele.units;
          } else if (ele.house_type === "Apartment") {
            apaUnitsAdded[3] = obj.house_constructed_all;
            apaUnitsAva[3] = ele.units;
          }

          if (ele.house_type === "Row") {
            rowTotalAdded += obj.house_constructed_all;
            rowTotalAva += (vacancyRate.vacancy_rate / 100) * ele.units;
          } else {
            apartmentTotalAdded += obj.house_constructed_all;
            apartmentTotalAva += (vacancyRate.vacancy_rate / 100) * ele.units;
          }
        })
      );

      let rowTotalOccupied = rowTotal - Math.ceil(rowTotalAva);
      let apartmentTotalOccupied =
        apartmentTotal - Math.ceil(apartmentTotalAva);

      let historical_rental_stock_apartment = [0, 0, 0, 0, 0, 0];
      let historical_rental_stock_row = [0, 0, 0, 0, 0, 0];

      await Promise.all(
        arrYear.map(async (years) => {
          const dwellingDetails = await Services.dwellingTypeService.getAlls({
            province,
            year: years,
            cma,
            ca,
          });
          let rowTotal = 0;
          let apartmentTotal = 0;

          dwellingDetails.forEach((ele) => {
            if (ele.house_type === "Apartment") {
              apartmentTotal += ele.units;
            } else {
              rowTotal += ele.units;
            }
          });

          historical_rental_stock_apartment[year - years] = apartmentTotal;
          historical_rental_stock_row[year - years] = rowTotal;
        })
      );
      historical_rental_stock_apartment.reverse();
      historical_rental_stock_row.reverse();
      const historical_rental_stock_apartment_growth = calculateCAGR(
        historical_rental_stock_apartment
      );

      const historical_rental_stock_row_growth = calculateCAGR(
        historical_rental_stock_row
      );
      let mainObj = [];
      dwellingDetailss.map((ele) => {
        rentDetails.map((rr) => {
          if (
            ele.bedroom_type === rr.bedroom_type &&
            ele.house_type === rr.house_type
          ) {
            let obj = {
              ...ele,
              rent_value: rr.rent_value,
            };
            obj.constructed = ele.units * (ele.rental_percentage / 100);
            obj.available = ele.units * (ele.vacancy_rate / 100);
            obj.occupied = ele.units - ele.units * (ele.vacancy_rate / 100);
            obj.rent_value = rr.rent_value;
            mainObj.push(obj);
          }
        });
      });

      let graph_1_8_current = [0, 0, 0, 0];
      let graph_1_8_new = [0, 0, 0, 0];
      dwellingDetailss.map((ele) => {
        if (house_type === "Apartment" && ele.house_type === "Apartment") {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_1_8_current[0] += ele.units;
            graph_1_8_new[0] += ele.house_constructed_all;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_1_8_current[1] += ele.units;
            graph_1_8_new[1] += ele.house_constructed_all;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_1_8_current[2] += ele.units;
            graph_1_8_new[2] += ele.house_constructed_all;
          } else {
            graph_1_8_current[3] += ele.units;
            graph_1_8_new[3] += ele.house_constructed_all;
          }
        } else if (house_type === "Row House" && ele.house_type === "Row") {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_1_8_current[0] += ele.units;
            graph_1_8_new[0] += ele.house_constructed_all;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_1_8_current[1] += ele.units;
            graph_1_8_new[1] += ele.house_constructed_all;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_1_8_current[2] += ele.units;
            graph_1_8_new[2] += ele.house_constructed_all;
          } else {
            graph_1_8_current[3] += ele.units;
            graph_1_8_new[3] += ele.house_constructed_all;
          }
        } else if (house_type === "Apartment & Row House") {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_1_8_current[0] += ele.units;
            graph_1_8_new[0] += ele.house_constructed_all;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_1_8_current[1] += ele.units;
            graph_1_8_new[1] += ele.house_constructed_all;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_1_8_current[2] += ele.units;
            graph_1_8_new[2] += ele.house_constructed_all;
          } else {
            graph_1_8_current[3] += ele.units;
            graph_1_8_new[3] += ele.house_constructed_all;
          }
        }
      });

      let averageRent = 0;
      let mainmainObj = [];
      mainObj.map((ele) => {
        let obj = {
          ...ele,
          optimal_income_before_tax: (ele.rent_value * 12) / 0.3,
          optimal_income_after_tax:
            ele.rent_value * 12 + cost_of_non_shelter_necessity,
        };
        mainmainObj.push(obj);
        if (house_type === "Apartment" && ele.house_type === "Apartment") {
          averageRent += ele.rent_value;
        } else if (ele.house_type === "Row" && house_type === "Row House") {
          averageRent += ele.rent_value;
        } else if (house_type === "Apartment & Row House") {
          averageRent += ele.rent_value;
        }
      });
      let total_current_unaffordable_houses = 0;
      let total_current_affordable_houses = 0;
      let total_current_unaffordable_houses_available = 0;
      let total_current_affordable_houses_available = 0;
      let total_current_unaffordable_houses_const = 0;
      let total_current_affordable_houses_const = 0;

      let total_current_unaffordable_houses_row = 0;
      let total_current_affordable_houses_row = 0;
      let total_current_unaffordable_houses_available_row = 0;
      let total_current_affordable_houses_available_row = 0;
      let total_current_unaffordable_houses_const_row = 0;
      let total_current_affordable_houses_const_row = 0;

      let total_current_unaffordable_houses_apa = 0;
      let total_current_affordable_houses_apa = 0;
      let total_current_unaffordable_houses_available_apa = 0;
      let total_current_affordable_houses_available_apa = 0;
      let total_current_unaffordable_houses_const_apa = 0;
      let total_current_affordable_houses_const_apa = 0;

      canadaIncomeSurveyDetails.map((ele) => {
        let unaffordable = 0;
        let unaffordable_available = 0;
        let unaffordable_const = 0;
        let affordable = 0;
        let affordable_available = 0;
        let affordable_const = 0;
        let unaffordable_row = 0;
        let unaffordable_available_row = 0;
        let unaffordable_const_row = 0;
        let affordable_row = 0;
        let affordable_available_row = 0;
        let affordable_const_row = 0;
        let unaffordable_apa = 0;
        let unaffordable_available_apa = 0;
        let unaffordable_const_apa = 0;
        let affordable_apa = 0;
        let affordable_available_apa = 0;
        let affordable_const_apa = 0;
        mainObj.map((eke) => {
          if (
            (house_type === "Row House" && eke.house_type === "Row") ||
            (house_type === "Apartment" && eke.house_type === "Apartment") ||
            house_type === "Apartment & Row House"
          ) {
            if (
              ele.income_bracket ===
              "Percentage Under $10,000 (Including Zeros And Losses)"
            ) {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 0) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (eke.rent_value > (0 - cost_of_non_shelter_necessity) / 12) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$10,000 To $19,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 250) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (10000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$20,000 To $29,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 500) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (20000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$30,000 To $39,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 750) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (30000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$40,000 To $49,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1000) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (40000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$50,000 To $59,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1250) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (50000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$60,000 To $79,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1500) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (60000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$80,000 To $99,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 2000) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (80000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            } else {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 2500) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (100000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable += eke.units;
                  unaffordable_available += Math.ceil(eke.available);
                  unaffordable_const += eke.house_constructed_all;
                } else {
                  affordable += eke.units;
                  affordable_available += Math.ceil(eke.available);
                  affordable_const += eke.house_constructed_all;
                }
              }
            }
          }
          if (eke.house_type === "Row") {
            if (
              ele.income_bracket ===
              "Percentage Under $10,000 (Including Zeros And Losses)"
            ) {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 0) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (eke.rent_value > (0 - cost_of_non_shelter_necessity) / 12) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$10,000 To $19,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 250) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (10000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$20,000 To $29,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 500) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (20000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$30,000 To $39,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 750) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (30000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$40,000 To $49,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1000) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (40000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$50,000 To $59,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1250) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (50000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$60,000 To $79,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1500) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (60000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$80,000 To $99,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 2000) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (80000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            } else {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 2500) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (100000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_row += eke.units;
                  unaffordable_available_row += Math.ceil(eke.available);
                  unaffordable_const_row += eke.house_constructed_all;
                } else {
                  affordable_row += eke.units;
                  affordable_available_row += Math.ceil(eke.available);
                  affordable_const_row += eke.house_constructed_all;
                }
              }
            }
          } else {
            if (
              ele.income_bracket ===
              "Percentage Under $10,000 (Including Zeros And Losses)"
            ) {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 0) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (eke.rent_value > (0 - cost_of_non_shelter_necessity) / 12) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$10,000 To $19,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 250) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (10000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$20,000 To $29,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 500) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (20000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$30,000 To $39,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 750) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (30000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$40,000 To $49,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1000) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (40000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$50,000 To $59,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1250) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (50000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$60,000 To $79,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 1500) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (60000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else if (ele.income_bracket === "$80,000 To $99,999") {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 2000) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (80000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            } else {
              if (
                affordability === "30% of Gross Income" ||
                affordability === "Both Definations"
              ) {
                if (eke.rent_value > 2500) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              } else {
                if (
                  eke.rent_value >
                  (100000 - cost_of_non_shelter_necessity) / 12
                ) {
                  unaffordable_apa += eke.units;
                  unaffordable_available_apa += Math.ceil(eke.available);
                  unaffordable_const_apa += eke.house_constructed_all;
                } else {
                  affordable_apa += eke.units;
                  affordable_available_apa += Math.ceil(eke.available);
                  affordable_const_apa += eke.house_constructed_all;
                }
              }
            }
          }
        });
        total_current_unaffordable_houses += Math.ceil(
          unaffordable * (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses += Math.ceil(
          affordable * (ele.percentage_of_family_total_income / 100)
        );
        total_current_unaffordable_houses_available += Math.ceil(
          unaffordable_available * (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_available += Math.ceil(
          affordable_available * (ele.percentage_of_family_total_income / 100)
        );
        total_current_unaffordable_houses_const += Math.ceil(
          unaffordable_const * (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_const += Math.ceil(
          affordable_const * (ele.percentage_of_family_total_income / 100)
        );

        total_current_unaffordable_houses_row += Math.ceil(
          unaffordable_row * (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_row += Math.ceil(
          affordable_row * (ele.percentage_of_family_total_income / 100)
        );
        total_current_unaffordable_houses_available_row += Math.ceil(
          unaffordable_available_row *
            (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_available_row += Math.ceil(
          affordable_available_row *
            (ele.percentage_of_family_total_income / 100)
        );
        total_current_unaffordable_houses_const_row += Math.ceil(
          unaffordable_const_row * (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_const_row += Math.ceil(
          affordable_const_row * (ele.percentage_of_family_total_income / 100)
        );

        total_current_unaffordable_houses_apa += Math.ceil(
          unaffordable_apa * (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_apa += Math.ceil(
          affordable_apa * (ele.percentage_of_family_total_income / 100)
        );
        total_current_unaffordable_houses_available_apa += Math.ceil(
          unaffordable_available_apa *
            (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_available_apa += Math.ceil(
          affordable_available_apa *
            (ele.percentage_of_family_total_income / 100)
        );
        total_current_unaffordable_houses_const_apa += Math.ceil(
          unaffordable_const_apa * (ele.percentage_of_family_total_income / 100)
        );
        total_current_affordable_houses_const_apa += Math.ceil(
          affordable_const_apa * (ele.percentage_of_family_total_income / 100)
        );
      });

      if (
        affordability === "30% of Gross Income" ||
        affordability === "Both Definations"
      ) {
        averageRent = Math.ceil(((averageRent / 4) * 12) / 0.3);
      } else {
        averageRent = Math.ceil(
          (averageRent / 4) * 12 + cost_of_non_shelter_necessity
        );
      }

      //averageRent = Math.round(averageRent / 10000) * 10000;

      let optimal_incomes = [0, 0, 0, 0, 0, 0, 0, 0];
      let optimal_incomes_diff = [0, 0, 0, 0, 0, 0, 0, 0];
      mainmainObj.map((ele) => {
        if (ele.house_type === "Row") {
          if (ele.bedroom_type === "0 Bedroom") {
            optimal_incomes[0] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[0] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "1 Bedroom") {
            optimal_incomes[1] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[1] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "2 Bedroom") {
            optimal_incomes[2] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[2] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          } else {
            optimal_incomes[3] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[3] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          }
        } else {
          if (ele.bedroom_type === "0 Bedroom") {
            optimal_incomes[4] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[4] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "1 Bedroom") {
            optimal_incomes[5] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[5] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "2 Bedroom") {
            optimal_incomes[6] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[6] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          } else {
            optimal_incomes[7] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[7] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? canadaIncomeSurveyDetails?.[0]?.median_before_tax -
                  ele.optimal_income_before_tax
                : canadaIncomeSurveyDetails?.[0]?.median_after_tax -
                  ele.optimal_income_after_tax;
          }
        }
      });

      const provinceList = await Services.provinceListService.getAllProvinces(
        {}
      );
      let graph_4_3_utility = new Map();
      let graph_4_3_abbr = [];
      let graph_4_3_affordable = new Map();
      let graph_4_3_average_rent_row = new Map();
      let graph_4_3_average_rent_apa = new Map();
      await Promise.all(
        provinceList.map(async (ele) => {
          let abbr = provincesMap.get(ele.province);
          graph_4_3_abbr.push(`"${abbr}"`);
          const multiplier = await Services.multiplierService.getAllFr({
            province: ele.province,
            year,
            cma: "Na",
            ca: "Na",
          });
          graph_4_3_utility[`"${abbr}"`] = Math.ceil(
            multiplier.result[0].average_utility / 12
          );

          const canadaIncomeSurveyDetails =
            await Services.canadaIncomeSurveyService.getAlls({
              province: ele.province,
              year: Number(year),
              cma: "Na",
              ca: "Na",
            });
          if (
            affordability === "30% of Gross Income" ||
            affordability === "Both Definations"
          ) {
            graph_4_3_affordable[`"${abbr}"`] = Math.ceil(
              (0.3 * canadaIncomeSurveyDetails[0].median_before_tax) / 12
            );
          } else {
            let marketBasketDetails;
            if (
              source_of_cost_of_non_shelter_necessity ===
              "Poverty Line Expenses"
            ) {
              marketBasketDetails =
                await Services.marketBasketMeasureService.getDetail({
                  province: ele.province,
                  year,
                });
            } else {
              marketBasketDetails =
                await Services.householdSpendingService.getDetail({
                  province: ele.province,
                  year,
                });
            }

            const cost_of_non_shelter_necessity = marketBasketDetails?.cost;
            graph_4_3_affordable[`"${abbr}"`] =
              (canadaIncomeSurveyDetails[0].median_after_tax -
                cost_of_non_shelter_necessity) /
              12;
          }

          const rents = await Services.rentService.getAlls({
            province: ele.province,
            year,
            cma: "Na",
            ca: "Na",
          });
          let row = 0;
          let apa = 0;
          rents.map((eke) => {
            if (eke.house_type === "Row") {
              row += eke.rent_value;
            } else {
              apa += eke.rent_value;
            }
          });
          graph_4_3_average_rent_row[`"${abbr}"`] = Math.ceil(row / 4);
          graph_4_3_average_rent_apa[`"${abbr}"`] = Math.ceil(apa / 4);
        })
      );
      let graph_3_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      let graph_3_1_color = ["", "", "", "", "", "", "", "", ""];
      let redPercent = 0;
      let greenPercent = 0;
      canadaIncomeSurveyDetails.map((eke) => {
        if (eke.income_bracket === "$100,000 And Over") {
          if (averageRent > 100000) {
            redPercent += eke.percentage_of_family_total_income;
            graph_3_1_color[8] = `"#bb1823"`;
          } else {
            graph_3_1_color[8] = `"green"`;
          }
          graph_3_1[8] = eke.percentage_of_family_total_income;
        } else if (eke.income_bracket === "$80,000 To $99,999") {
          if (averageRent > 80000) {
            if (averageRent < 100000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 19999) *
                  (19999 - (99999 - averageRent))
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[7] = `"#bb1823"`;
          } else {
            graph_3_1_color[7] = `"green"`;
          }
          graph_3_1[7] = eke.percentage_of_family_total_income;
        } else if (eke.income_bracket === "$60,000 To $79,999") {
          if (averageRent > 60000) {
            if (averageRent < 80000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 19999) *
                  (19999 - (79999 - averageRent))
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[6] = `"#bb1823"`;
          } else {
            graph_3_1_color[6] = `"green"`;
          }
          graph_3_1[6] = eke.percentage_of_family_total_income;
        } else if (eke.income_bracket === "$50,000 To $59,999") {
          if (averageRent > 50000) {
            if (averageRent < 60000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 9999) *
                  (9999 - (59999 - averageRent))
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[5] = `"#bb1823"`;
          } else {
            graph_3_1_color[5] = `"green"`;
          }

          graph_3_1[5] = eke.percentage_of_family_total_income;
        } else if (eke.income_bracket === "$40,000 To $49,999") {
          if (averageRent > 40000) {
            if (averageRent < 50000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 9999) *
                  (9999 - (49999 - averageRent))
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[4] = `"#bb1823"`;
          } else {
            graph_3_1_color[4] = `"green"`;
          }

          graph_3_1[4] = eke.percentage_of_family_total_income;
        } else if (eke.income_bracket === "$30,000 To $39,999") {
          if (averageRent > 30000) {
            if (averageRent < 40000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 9999) *
                  (9999 - (39999 - averageRent))
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[3] = `"#bb1823"`;
          } else {
            graph_3_1_color[3] = `"green"`;
          }
          graph_3_1[3] = eke.percentage_of_family_total_income;
        } else if (eke.income_bracket === "$20,000 To $29,999") {
          if (averageRent > 20000) {
            if (averageRent < 30000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 9999) *
                  (9999 - (29999 - averageRent))
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[2] = `"#bb1823"`;
          } else {
            graph_3_1_color[2] = `"green"`;
          }
          graph_3_1[2] = eke.percentage_of_family_total_income;
        } else if (eke.income_bracket === "$10,000 To $19,999") {
          if (averageRent > 10000) {
            if (averageRent < 20000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 9999) *
                  (9999 - (19999 - averageRent))
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[1] = `"#bb1823"`;
          } else {
            graph_3_1_color[1] = `"green"`;
          }
          graph_3_1[1] = eke.percentage_of_family_total_income;
        } else {
          if (averageRent > 0) {
            if (averageRent < 10000) {
              redPercent += Number(
                (
                  (eke.percentage_of_family_total_income / 9999) *
                  (9999 - averageRent)
                ).toFixed(1)
              );
            } else {
              redPercent += eke.percentage_of_family_total_income;
            }
            graph_3_1_color[0] = `"#bb1823"`;
          } else {
            graph_3_1_color[0] = `"green"`;
          }
          graph_3_1[0] = eke.percentage_of_family_total_income;
        }
      });
      greenPercent = 100 - redPercent;
      let graph_4_1_province = [0, 0, 0, 0, 0, 0, 0, 0];
      let graph_4_1_cma = [0, 0, 0, 0, 0, 0, 0, 0];
      let graph_4_1_canada = [0, 0, 0, 0, 0, 0, 0, 0];
      const rentCma = await Services.rentService.getAlls({
        province,
        cma,
        ca,
        year,
      });
      rentCma.map((ele) => {
        if (rent_source === "Average Listing Rent") {
          ele.rent_value = ele.rent_value * multiplier?.rent;
        }
        if (ele.house_type === "Row") {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_4_1_cma[4] = ele.rent_value;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_4_1_cma[5] = ele.rent_value;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_4_1_cma[6] = ele.rent_value;
          } else {
            graph_4_1_cma[7] = ele.rent_value;
          }
        } else {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_4_1_cma[0] = ele.rent_value;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_4_1_cma[1] = ele.rent_value;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_4_1_cma[2] = ele.rent_value;
          } else {
            graph_4_1_cma[3] = ele.rent_value;
          }
        }
      });

      const rentProvince = await Services.rentService.getAlls({
        province,
        cma: "Na",
        ca: "Na",
        year,
      });
      const multiplierProvince = await Services.multiplierService.getDetail({
        province,
        cma: "Na",
        ca: "Na",
        year,
      });
      rentProvince.map((ele) => {
        if (rent_source === "Average Listing Rent") {
          ele.rent_value = ele.rent_value * multiplierProvince?.rent;
        }
        if (ele.house_type === "Row") {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_4_1_province[4] = ele.rent_value;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_4_1_province[5] = ele.rent_value;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_4_1_province[6] = ele.rent_value;
          } else {
            graph_4_1_province[7] = ele.rent_value;
          }
        } else {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_4_1_province[0] = ele.rent_value;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_4_1_province[1] = ele.rent_value;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_4_1_province[2] = ele.rent_value;
          } else {
            graph_4_1_province[3] = ele.rent_value;
          }
        }
      });
      const rentCanada = await Services.rentService.getAlls({
        province: "Canada",
        cma: "Na",
        ca: "Na",
        year,
      });
      const multiplierCanada = await Services.multiplierService.getDetail({
        province: "Canada",
        cma: "Na",
        ca: "Na",
        year,
      });
      rentCanada.map((ele) => {
        if (rent_source === "Average Listing Rent") {
          ele.rent_value = ele.rent_value * multiplierCanada?.rent;
        }
        if (ele.house_type === "Row") {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_4_1_canada[0] = ele.rent_value;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_4_1_canada[1] = ele.rent_value;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_4_1_canada[2] = ele.rent_value;
          } else {
            graph_4_1_canada[3] = ele.rent_value;
          }
        } else {
          if (ele.bedroom_type === "0 Bedroom") {
            graph_4_1_canada[4] = ele.rent_value;
          } else if (ele.bedroom_type === "1 Bedroom") {
            graph_4_1_canada[5] = ele.rent_value;
          } else if (ele.bedroom_type === "2 Bedroom") {
            graph_4_1_canada[6] = ele.rent_value;
          } else {
            graph_4_1_canada[7] = ele.rent_value;
          }
        }
      });
      const graph_3_2_val = [0, 0, 0, 0, 0, 0];
      await Promise.all(
        arrYear.map(async (years) => {
          const canadaIncomeSurveyDetails =
            await Services.canadaIncomeSurveyService.getAlls({
              province,
              year: years,
              cma,
              ca,
            });
          let total = 0;
          let house = "";
          if (house_type === "Apartment") {
            house = "Apartment";
          } else {
            house = "Row";
          }
          const rentDetail = await Services.rentService.getDetail({
            province,
            year: String(years),
            cma,
            ca,
            house_type: house,
            bedroom_type: "2 Bedroom",
          });
          const multiplier = await Services.multiplierService.getDetail({
            province,
            cma,
            ca,
            year: String(years),
          });
          let marketBasketDetails;
          if (
            source_of_cost_of_non_shelter_necessity === "Poverty Line Expenses"
          ) {
            marketBasketDetails =
              await Services.marketBasketMeasureService.getDetail({
                province,
                year: String(years),
                cma,
                ca,
              });
          } else {
            marketBasketDetails =
              await Services.householdSpendingService.getDetail({
                province,
                year: String(years),
                ca,
                cma,
              });
          }
          const cost_of_non_shelter_necessity = marketBasketDetails?.cost;

          canadaIncomeSurveyDetails.map((eke) => {
            if (eke.income_bracket === "$100,000 And Over") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (100000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else if (eke.income_bracket === "$80,000 To $99,999") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (80000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else if (eke.income_bracket === "$60,000 To $79,999") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (60000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else if (eke.income_bracket === "$50,000 To $59,999") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (50000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else if (eke.income_bracket === "$40,000 To $49,999") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (40000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else if (eke.income_bracket === "$30,000 To $39,999") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (30000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else if (eke.income_bracket === "$20,000 To $29,999") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (20000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else if (eke.income_bracket === "$10,000 To $19,999") {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (10000 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            } else {
              let gg = rentDetail.rent_value * multiplier.utility * 12;
              total +=
                (0 - cost_of_non_shelter_necessity - gg) *
                (eke.percentage_of_family_after_tax_income / 100);
            }
          });
          graph_3_2_val[Number(year) - Number(years)] = Math.ceil(total);
        })
      );
      graph_3_2_val.reverse();
      const rental_share_row =
        (house_constructed_rental_row / house_constructed_all_row) * 100;
      const owner_share_row =
        (house_constructed_owned_row / house_constructed_all_row) * 100;
      const rental_share_apa =
        (house_constructed_rental_apa / house_constructed_all_apa) * 100;
      const owner_share_apa =
        (house_constructed_owned_apa / house_constructed_all_apa) * 100;

      const dwellingDetailsPast = await Services.dwellingTypeService.getAlls({
        province,
        year: String(Number(year - 1)),
        cma,
        ca,
      });
      let house_constructed_all_row_past = 0;
      let house_constructed_rental_row_past = 0;
      let house_constructed_owned_row_past = 0;
      let house_constructed_all_apa_past = 0;
      let house_constructed_rental_apa_past = 0;
      let house_constructed_owned_apa_past = 0;
      let bool3 = false,
        bool4 = false;
      await Promise.all(
        dwellingDetailsPast.map(async (ele) => {
          const completeHousing =
            await Services.completeHousingService.getDetail({
              province,
              cma,
              ca,
              year: Number(Number(year) - 1),
              intended_market: "All",
              house_type: ele.house_type,
            });

          const completeHousing2 =
            await Services.completeHousingService.getDetail({
              province,
              cma,
              ca,
              year: Number(Number(year) - 1),
              intended_market: "Rental",
              house_type: ele.house_type,
            });
          const completeHousing3 =
            await Services.completeHousingService.getDetail({
              province,
              cma,
              ca,
              year: Number(Number(year) - 1),
              intended_market: "Owner",
              house_type: ele.house_type,
            });
          if (ele.house_type === "Row" && !bool3) {
            bool3 = true;
            house_constructed_all_row_past += completeHousing.units;
            house_constructed_rental_row_past += completeHousing2.units;
            house_constructed_owned_row_past += completeHousing3.units;
          } else if (!bool4) {
            bool4 = true;
            house_constructed_all_apa_past += completeHousing.units;
            house_constructed_rental_apa_past += completeHousing2.units;
            house_constructed_owned_apa_past += completeHousing3.units;
          }
        })
      );

      house_constructed_rental_row_past =
        house_constructed_rental_row_past === 0
          ? 0.001
          : house_constructed_rental_row_past;
      house_constructed_owned_row_past =
        house_constructed_owned_row_past === 0
          ? 0.001
          : house_constructed_owned_row_past;
      house_constructed_rental_apa_past =
        house_constructed_rental_apa_past === 0
          ? 0.001
          : house_constructed_rental_apa_past;
      house_constructed_owned_apa_past =
        house_constructed_owned_apa_past === 0
          ? 0.001
          : house_constructed_owned_apa_past;
      const rental_share_row_growth =
        ((house_constructed_rental_row - house_constructed_rental_row_past) /
          house_constructed_rental_row_past) *
        100;
      const owned_share_row_growth =
        ((house_constructed_owned_row - house_constructed_owned_row_past) /
          house_constructed_owned_row_past) *
        100;
      const rental_share_apa_growth =
        ((house_constructed_rental_apa - house_constructed_rental_apa_past) /
          house_constructed_rental_apa_past) *
        100;
      const owned_share_apa_growth =
        ((house_constructed_owned_apa - house_constructed_owned_apa_past) /
          house_constructed_owned_apa_past) *
        100;

      const sumRentalSupplyCurrent = graph_1_8_current.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const sumRentalSupplyNew = graph_1_8_new.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const rentalSupplyPercentage =
        (sumRentalSupplyNew / sumRentalSupplyCurrent) * 100;

      let graph_1_7_30 = [];
      let graph_1_7_residual = [];
      let graph_1_7_current = [];
      let graph_1_7_label = [];
      if (averageRent <= 10000) {
        graph_1_7_label = [
          `"$10,000 to $19,999"`,
          `"$20,000 to $29,999"`,
          `"$30,000 to $39,999"`,
          `"$40,000 to $49,999"`,
          `"$50,000 to $59,999"`,
          `"$60,000 to $79,999"`,
          `"$80,000 to $99,999"`,
          `"$100,000 and over"`,
        ];
        graph_1_7_30 = [250, 500, 750, 1000, 1250, 1500, 2000, 2500];
        graph_1_7_residual = [
          (10000 - cost_of_non_shelter_necessity) / 12,
          (20000 - cost_of_non_shelter_necessity) / 12,
          (30000 - cost_of_non_shelter_necessity) / 12,
          (40000 - cost_of_non_shelter_necessity) / 12,
          (50000 - cost_of_non_shelter_necessity) / 12,
          (60000 - cost_of_non_shelter_necessity) / 12,
          (80000 - cost_of_non_shelter_necessity) / 12,
          (100000 - cost_of_non_shelter_necessity) / 12,
        ];
      } else if (averageRent <= 20000) {
        graph_1_7_label = [
          `"$20,000 to $29,999"`,
          `"$30,000 to $39,999"`,
          `"$40,000 to $49,999"`,
          `"$50,000 to $59,999"`,
          `"$60,000 to $79,999"`,
          `"$80,000 to $99,999"`,
          `"$100,000 and over"`,
        ];
        graph_1_7_residual = [
          (20000 - cost_of_non_shelter_necessity) / 12,
          (30000 - cost_of_non_shelter_necessity) / 12,
          (40000 - cost_of_non_shelter_necessity) / 12,
          (50000 - cost_of_non_shelter_necessity) / 12,
          (60000 - cost_of_non_shelter_necessity) / 12,
          (80000 - cost_of_non_shelter_necessity) / 12,
          (100000 - cost_of_non_shelter_necessity) / 12,
        ];
        graph_1_7_30 = [500, 750, 1000, 1250, 1500, 2000, 2500];
      } else if (averageRent <= 30000) {
        graph_1_7_label = [
          `"$30,000 to $39,999"`,
          `"$40,000 to $49,999"`,
          `"$50,000 to $59,999"`,
          `"$60,000 to $79,999"`,
          `"$80,000 to $99,999"`,
          `"$100,000 and over"`,
        ];
        graph_1_7_residual = [
          (30000 - cost_of_non_shelter_necessity) / 12,
          (40000 - cost_of_non_shelter_necessity) / 12,
          (50000 - cost_of_non_shelter_necessity) / 12,
          (60000 - cost_of_non_shelter_necessity) / 12,
          (80000 - cost_of_non_shelter_necessity) / 12,
          (100000 - cost_of_non_shelter_necessity) / 12,
        ];
        graph_1_7_30 = [750, 1000, 1250, 1500, 2000, 2500];
      } else if (averageRent <= 40000) {
        graph_1_7_label = [
          `"$40,000 to $49,999"`,
          `"$50,000 to $59,999"`,
          `"$60,000 to $79,999"`,
          `"$80,000 to $99,999"`,
          `"$100,000 and over"`,
        ];
        graph_1_7_residual = [
          (40000 - cost_of_non_shelter_necessity) / 12,
          (50000 - cost_of_non_shelter_necessity) / 12,
          (60000 - cost_of_non_shelter_necessity) / 12,
          (80000 - cost_of_non_shelter_necessity) / 12,
          (100000 - cost_of_non_shelter_necessity) / 12,
        ];
        graph_1_7_30 = [1000, 1250, 1500, 2000, 2500];
      } else if (averageRent <= 50000) {
        graph_1_7_label = [
          `"$50,000 to $59,999"`,
          `"$60,000 to $79,999"`,
          `"$80,000 to $99,999"`,
          `"$100,000 and over"`,
        ];
        graph_1_7_residual = [
          (50000 - cost_of_non_shelter_necessity) / 12,
          (60000 - cost_of_non_shelter_necessity) / 12,
          (80000 - cost_of_non_shelter_necessity) / 12,
          (100000 - cost_of_non_shelter_necessity) / 12,
        ];
        graph_1_7_30 = [1250, 1500, 2000, 2500];
      } else if (averageRent <= 60000) {
        graph_1_7_label = [
          `"$60,000 to $79,999"`,
          `"$80,000 to $99,999"`,
          `"$100,000 and over"`,
        ];
        graph_1_7_residual = [
          (60000 - cost_of_non_shelter_necessity) / 12,
          (80000 - cost_of_non_shelter_necessity) / 12,
          (100000 - cost_of_non_shelter_necessity) / 12,
        ];
        graph_1_7_30 = [1500, 2000, 2500];
      } else if (averageRent <= 80000) {
        graph_1_7_label = [`"$80,000 to $99,999"`, `"$100,000 and over"`];
        graph_1_7_residual = [
          (80000 - cost_of_non_shelter_necessity) / 12,
          (100000 - cost_of_non_shelter_necessity) / 12,
        ];
        graph_1_7_30 = [2000, 2500];
      } else if (averageRent <= 100000) {
        graph_1_7_label = [`"$100,000 and over"`];
        graph_1_7_30 = [2500];
        graph_1_7_residual = [(100000 - cost_of_non_shelter_necessity) / 12];
      }
      for (let i = 0; i < graph_1_7_30.length; i += 1) {
        graph_1_7_current.push(current_shelter_cost);
      }

      const incomeRank = await Services.incomeRankingProvinceService.getDetail({
        province,
        year,
      });

      let income_rank =
        affordability === "30% of Gross Income" ||
        affordability === "Both Definations"
          ? incomeRank[0].ranking_before_tax
          : incomeRank[0].ranking_after_tax;

      let final_rank = "";

      let listing = [];
      if (cma === "Na") {
        listing = await Services.rentalRankingCAService.getAlls({ year });
      } else {
        listing = await Services.rentalRankingCMAService.getAlls({ year });
      }
      let rankingArr = [];
      await Promise.all(
        listing.map(async (geo) => {
          let province = geo.province;
          let cma = "",
            ca = "";
          if (geo?.ca) {
            ca = geo.ca;
            cma = "Na";
          } else {
            cma = geo.cma;
            ca = "Na";
          }

          let marketBasketDetails;
          if (
            source_of_cost_of_non_shelter_necessity === "Poverty Line Expenses"
          ) {
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
          const cost_of_non_shelter_necessity = marketBasketDetails?.cost;

          const multiplier = await Services.multiplierService.getDetail({
            province,
            cma,
            ca,
            year,
          });
          let rentDetails = await Services.rentService.getAlls({
            province,
            cma,
            ca,
            year,
          });

          rentDetails.forEach((ele) => {
            if (rent_source === "Average Listing Rent") {
              ele.rent_value = ele.rent_value * multiplier?.rent;
            }
            ele.rent_value = Math.ceil(ele.rent_value * multiplier?.utility);
          });
          const canadaIncomeSurveyDetails =
            await Services.canadaIncomeSurveyService.getAlls({
              province,
              year,
              cma,
              ca,
            });

          const dwellingDetails = await Services.dwellingTypeService.getAlls({
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
          let dwellingDetailsa = [];
          dwellingDetails.map((ele) => {
            let bedroom_percentage = 0;
            if (ele.house_type === "Apartment") {
              bedroom_percentage = ele.units / apartmentTotal;
            } else {
              bedroom_percentage = ele.units / rowTotal;
            }
            dwellingDetailsa.push({
              ...ele.dataValues,
              bedroom_percentage: Number(bedroom_percentage),
            });
          });

          let dwellingDetailss = [];
          await Promise.all(
            dwellingDetailsa.map(async (ele) => {
              const vacancyRate = await Services.vacancyRateService.getDetail({
                province,
                cma,
                ca,
                year,
                bedroom_type: ele.bedroom_type,
                house_type: ele.house_type,
              });

              const completeHousing2 =
                await Services.completeHousingService.getDetail({
                  province,
                  cma,
                  ca,
                  year: Number(year),
                  intended_market: "Rental",
                  house_type: ele.house_type,
                });

              let obj = {
                ...ele,
                vacancy_rate: vacancyRate.vacancy_rate,
                house_constructed_all: Math.ceil(
                  completeHousing2?.units * ele.bedroom_percentage
                ),
              };
              dwellingDetailss.push(obj);
            })
          );
          let mainObj = [];
          dwellingDetailss.map((ele) => {
            rentDetails.map((rr) => {
              if (
                ele.bedroom_type === rr.bedroom_type &&
                ele.house_type === rr.house_type
              ) {
                let obj = {
                  ...ele,
                  rent_value: rr.rent_value,
                };
                obj.available = ele.units * (ele.vacancy_rate / 100);
                obj.rent_value = rr.rent_value;
                mainObj.push(obj);
              }
            });
          });

          let total_current_affordable_houses = 0;
          canadaIncomeSurveyDetails.map((ele) => {
            let unaffordable = 0;
            let unaffordable_available = 0;
            let unaffordable_const = 0;
            let affordable = 0;
            let affordable_available = 0;
            let affordable_const = 0;
            mainObj.map((eke) => {
              if (
                (house_type === "Row House" && eke.house_type === "Row") ||
                (house_type === "Apartment" &&
                  eke.house_type === "Apartment") ||
                house_type === "Apartment & Row House"
              ) {
                if (
                  ele.income_bracket ===
                  "Percentage Under $10,000 (Including Zeros And Losses)"
                ) {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 0) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (0 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else if (ele.income_bracket === "$10,000 To $19,999") {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 250) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (10000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else if (ele.income_bracket === "$20,000 To $29,999") {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 500) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (20000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else if (ele.income_bracket === "$30,000 To $39,999") {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 750) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (30000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else if (ele.income_bracket === "$40,000 To $49,999") {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 1000) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (40000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else if (ele.income_bracket === "$50,000 To $59,999") {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 1250) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (50000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else if (ele.income_bracket === "$60,000 To $79,999") {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 1500) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (60000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else if (ele.income_bracket === "$80,000 To $99,999") {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 2000) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (80000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                } else {
                  if (
                    affordability === "30% of Gross Income" ||
                    affordability === "Both Definations"
                  ) {
                    if (eke.rent_value > 2500) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  } else {
                    if (
                      eke.rent_value >
                      (100000 - cost_of_non_shelter_necessity) / 12
                    ) {
                      unaffordable += eke.units;
                      unaffordable_available += Math.ceil(eke.available);
                      unaffordable_const += eke.house_constructed_all;
                    } else {
                      affordable += eke.units;
                      affordable_available += Math.ceil(eke.available);
                      affordable_const += eke.house_constructed_all;
                    }
                  }
                }
              }
            });

            total_current_affordable_houses += Math.ceil(
              affordable * (ele.percentage_of_family_total_income / 100)
            );
          });
          rankingArr.push({
            geography: cma === "Na" ? geo.ca : geo.cma,
            province,
            total_current_affordable_houses,
          });
        })
      );

      rankingArr.sort(
        (a, b) =>
          b.total_current_affordable_houses - a.total_current_affordable_houses
      );

      final_rank = findRank(cma === "Na" ? ca : cma, rankingArr);

      let tableHeigth = 2;
      let height = 1660;
      let invertHiegt = 250;
      if (
        geography === "Penticton" ||
        geography === "Abbotsford - Mission" ||
        geography === "Chilliwack" ||
        geography === "Kelowna" ||
        geography === "Lethbridge"
      ) {
        tableHeigth = 2.3;
      } else if (geography === "Victoria") {
        tableHeigth = 3.2;
        invertHiegt = 300;
        height = 1750;
      } else if (geography === "Vancouver") {
        tableHeigth = 2.8;
        height = 1700;
      } else if (geography === "Edmonton" || geography === "Calgary") {
        tableHeigth = 3;
        invertHiegt = 350;
        height = 1900;
      }
      // if (
      //   geography === "Gander" ||
      //   geography === "Corner Brook" ||
      //   geography === "Kentville" ||
      //   geography === "Truro" ||
      //   geography === "New Glasgow" ||
      //   geography === "Cape Breton" ||
      //   geography === "Moncton" ||
      //   geography === "Sant John" ||
      //   geography === "Bathurst" ||
      //   geography === "Miramichi" ||
      //   geography === "Campbellton" ||
      //   geography === "Edmundston"
      // ) {
      //   tableHeigth = 1.6;
      //   height = 1630;
      //   invertHiegt = 230;
      // } else if (
      //   geography === "St. John'S" ||
      //   geography === "Grand Falls-Windsor" ||
      //   geography === "Summerside" ||
      //   geography === "Charlottetown" ||
      //   geography === "Halifax" ||
      //   geography === "Fredericton"
      // ) {
      //   tableHeigth = 1.6;
      //   height = 1650;
      //   invertHiegt = 250;
      // }

      const link = await Services.pdfService.detailPdfGenerator({
        province,
        tableHeigth,
        height,
        geography,
        invertHiegt,
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
        median_household_income_before_tax_raw:
          canadaIncomeSurveyDetails?.[0]?.median_before_tax,
        median_household_income_before_tax,
        median_household_income_after_tax,
        rowTotal,
        apartmentTotal,
        historical_rental_stock_apartment,
        historical_rental_stock_row,
        historical_rental_stock_apartment_growth,
        historical_rental_stock_row_growth,
        rentDetails2,
        rowTotalOccupied,
        apartmentTotalOccupied,
        rowTotalAva: Math.ceil(rowTotalAva),
        apartmentTotalAva: Math.ceil(apartmentTotalAva),
        apaUnitsAva,
        rowUnitsAva,
        cost_of_non_shelter_necessity,
        apaUnitsAdded,
        rowUnitsAdded,
        rowTotalAdded,
        apartmentTotalAdded,
        dwellingDetailss,
        averageRent,
        mainmainObj,
        optimal_incomes,
        optimal_incomes_diff,
        graph_4_3_abbr,
        graph_4_3_affordable,
        graph_4_3_average_rent_apa,
        graph_4_3_average_rent_row,
        graph_4_3_utility,
        graph_4_1_cma,
        graph_4_1_province,
        graph_4_1_canada,
        graph_3_1,
        graph_3_2_val,
        rental_share_row,
        owner_share_apa,
        owner_share_row,
        rental_share_apa,
        rental_share_row_growth,
        owned_share_row_growth,
        rental_share_apa_growth,
        owned_share_apa_growth,
        graph_3_1_color,
        redPercent,
        greenPercent,
        graph_1_8_current,
        graph_1_8_new,
        rentalSupplyPercentage,
        graph_1_7_30,
        graph_1_7_residual,
        graph_1_7_current,
        graph_1_7_label,
        current_shelter_cost,
        total_current_unaffordable_houses,
        total_current_affordable_houses,
        total_current_unaffordable_houses_available,
        total_current_affordable_houses_available,
        total_current_unaffordable_houses_const,
        total_current_affordable_houses_const,
        total_current_unaffordable_houses_row,
        total_current_affordable_houses_row,
        total_current_unaffordable_houses_available_row,
        total_current_affordable_houses_available_row,
        total_current_unaffordable_houses_const_row,
        total_current_affordable_houses_const_row,
        total_current_unaffordable_houses_apa,
        total_current_affordable_houses_apa,
        total_current_unaffordable_houses_available_apa,
        total_current_affordable_houses_available_apa,
        total_current_unaffordable_houses_const_apa,
        total_current_affordable_houses_const_apa,
        final_rank,
        income_rank,
      });

      return res.json(link);
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
