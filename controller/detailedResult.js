const Services = require("../services");
const bedroom_type_const = [
  "0 Bedroom",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom +",
];
const house_type_const = ["Apartment", "Row"];
const provincesMap = new Map([
  ["Newfoundland and Labrador", "NL"],
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
          ele.rent_value = Math.ceil(ele.rent_value * multiplier?.rent);
        }
        current_shelter_cost += ele.shelter_cost;
      });

      //*************** START 1.15 & 1.17 ************************** */
      current_shelter_cost = current_shelter_cost / rentDetails.length;
      //*************** END 1.15 & 1.17 ************************** */

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
            ((historicalGrowthRow[year] - rowval) / rowval) * 100;
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
      const median_household_income_before_tax = Math.ceil(
        canadaIncomeSurveyDetails?.[0]?.median_before_tax / 1000
      );

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

      dwellingDetails.forEach((ele) => {
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
          bedroom_percentage: Number(bedroom_percentage.toFixed(2)),
        });
      });
      let dwellingDetailss = [];
      let apaUnitsAva = [0, 0, 0, 0];
      let rowUnitsAva = [0, 0, 0, 0];
      let apaUnitsAdded = [0, 0, 0, 0];
      let rowUnitsAdded = [0, 0, 0, 0];
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

      let historical_rental_stock_apartment = [];
      let historical_rental_stock_row = [];
      await Promise.all(
        arrYear.map(async (year) => {
          const dwellingDetails = await Services.dwellingTypeService.getAlls({
            province,
            year,
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
          historical_rental_stock_apartment.push(apartmentTotal);
          historical_rental_stock_row.push(rowTotal);
        })
      );
      const historical_rental_stock_apartment_growth =
        Math.round(
          (Math.pow(
            historical_rental_stock_apartment[
              historical_rental_stock_apartment.length - 1
            ] / historical_rental_stock_apartment[0],
            1 / arrYear.length
          ) -
            1) *
            10000
        ) / 100;
      const historical_rental_stock_row_growth =
        Math.round(
          (Math.pow(
            historical_rental_stock_row[
              historical_rental_stock_row.length - 1
            ] / historical_rental_stock_row[0],
            1 / arrYear.length
          ) -
            1) *
            10000
        ) / 100;
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
            obj.affordable =
              rr.rent_value <
              (0.3 * canadaIncomeSurveyDetails?.[0]?.median_before_tax) / 12
                ? true
                : false;
            obj.residual_affordable =
              (median_household_income_after_tax -
                cost_of_non_shelter_necessity) /
                12 >
              rr.rent_value
                ? true
                : false;
            obj.constructed = ele.units * (ele.rental_percentage / 100);
            obj.available = ele.units * (ele.vacancy_rate / 100);
            obj.occupied = ele.units - ele.units * (ele.vacancy_rate / 100);
            obj.rent_value = rr.rent_value;
            mainObj.push(obj);
          }
        });
      });
      let unaffordable_apartment_available = 0;
      let unaffordable_row_available = 0;
      let affordable_apartment_available = 0;
      let affordable_row_available = 0;
      let unaffordable_apartment_constructed = 0;
      let unaffordable_row_constructed = 0;
      let affordable_apartment_constructed = 0;
      let affordable_row_constructed = 0;
      let unaffordable_apartment_occupied = 0;
      let unaffordable_row_occupied = 0;
      let affordable_apartment_occupied = 0;
      let affordable_row_occupied = 0;
      let affordable_apartment = 0;
      let affordable_row = 0;
      let averageRent = 0;
      let mainmainObj = [];
      mainObj.map((ele) => {
        if (
          affordability === "30% of Gross Income" ||
          affordability === "Both Definations"
        ) {
          if (ele.affordable) {
            if (ele.house_type === "Apartment") {
              affordable_apartment_constructed += ele.constructed;
              affordable_apartment_available += ele.available;
              affordable_apartment_occupied += ele.occupied;
              affordable_apartment += ele.units;
            } else {
              affordable_row_constructed += ele.constructed;
              affordable_row_available += ele.available;
              affordable_row_occupied += ele.occupied;
              affordable_row += ele.units;
            }
          } else {
            if (ele.house_type === "Apartment") {
              unaffordable_apartment_constructed += ele.constructed;
              unaffordable_apartment_available += ele.available;
              unaffordable_apartment_occupied += ele.occupied;
            } else {
              unaffordable_row_constructed += ele.constructed;
              unaffordable_row_available += ele.available;
              unaffordable_row_occupied += ele.occupied;
            }
          }
        } else {
          if (ele.affordable) {
            if (ele.house_type === "Apartment") {
              affordable_apartment_constructed += ele.constructed;
              affordable_apartment_available += ele.available;
              affordable_apartment_occupied += ele.occupied;
              affordable_apartment += ele.units;
            } else {
              affordable_row_constructed += ele.constructed;
              affordable_row_available += ele.available;
              affordable_row_occupied += ele.occupied;
              affordable_row += ele.units;
            }
          } else {
            if (ele.house_type === "Apartment") {
              unaffordable_apartment_constructed += ele.constructed;
              unaffordable_apartment_available += ele.available;
              unaffordable_apartment_occupied += ele.occupied;
            } else {
              unaffordable_row_constructed += ele.constructed;
              unaffordable_row_available += ele.available;
              unaffordable_row_occupied += ele.occupied;
            }
          }
        }

        let obj = {
          ...ele,
          optimal_income_before_tax: (ele.rent_value * 12) / 0.3,
          optimal_income_after_tax:
            ele.rent_value * 12 + cost_of_non_shelter_necessity,
        };
        mainmainObj.push(obj);
        averageRent += ele.rent_value;
      });

      if (
        affordability === "30% of Gross Income" ||
        affordability === "Both Definations"
      ) {
        averageRent = Math.ceil(((averageRent / 8) * 12) / 0.3);
      } else {
        averageRent = Math.ceil(
          (averageRent / 8) * 12 + cost_of_non_shelter_necessity
        );
      }
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
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "1 Bedroom") {
            optimal_incomes[1] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[1] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "2 Bedroom") {
            optimal_incomes[2] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[2] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
          } else {
            optimal_incomes[3] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[3] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
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
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "1 Bedroom") {
            optimal_incomes[5] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[5] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
          } else if (ele.bedroom_type === "2 Bedroom") {
            optimal_incomes[6] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[6] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
          } else {
            optimal_incomes[7] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? ele.optimal_income_before_tax
                : ele.optimal_income_after_tax;
            optimal_incomes_diff[7] =
              affordability === "30% of Gross Income" ||
              affordability === "Both Definations"
                ? averageRent - ele.optimal_income_before_tax
                : averageRent - ele.optimal_income_after_tax;
          }
        }
      });

      const provinceList = await Services.provinceListService.getAllProvinces(
        {}
      );
      let graph_4_3_utility = [];
      let graph_4_3_abbr = [];
      let graph_4_3_affordable = [];
      let graph_4_3_average_rent_row = [];
      let graph_4_3_average_rent_apa = [];
      await Promise.all(
        provinceList.map(async (ele) => {
          let abbr = provincesMap.get(ele.province);
          graph_4_3_abbr.push(`"${abbr}"`);
          const multiplier = await Services.multiplierService.getAllFr({
            province: ele.province,
            year,
          });
          graph_4_3_utility.push(multiplier.result[0].average_utility);
          const canadaIncomeSurveyDetails =
            await Services.canadaIncomeSurveyService.getAlls({
              province: ele.province,
              year: Number(year),
              cma: "NA",
              ca: "NA",
            });
          let affordable_rent = 0;

          canadaIncomeSurveyDetails.map((eke) => {
            if (eke.income_bracket === "$100,000 and over") {
              affordable_rent +=
                2500 * (eke.percentage_of_family_total_income / 100);
            } else if (eke.income_bracket === "$80,000 to $99,999") {
              affordable_rent +=
                2000 * (eke.percentage_of_family_total_income / 100);
            } else if (eke.income_bracket === "$60,000 to $79,999") {
              affordable_rent +=
                1800 * (eke.percentage_of_family_total_income / 100);
            } else if (eke.income_bracket === "$50,000 to $59,999") {
              affordable_rent +=
                1250 * (eke.percentage_of_family_total_income / 100);
            } else if (eke.income_bracket === "$40,000 to $49,999") {
              affordable_rent +=
                1000 * (eke.percentage_of_family_total_income / 100);
            } else if (eke.income_bracket === "$30,000 to $39,999") {
              affordable_rent +=
                750 * (eke.percentage_of_family_total_income / 100);
            } else if (eke.income_bracket === "$20,000 to $29,999") {
              affordable_rent +=
                500 * (eke.percentage_of_family_total_income / 100);
            } else if (eke.income_bracket === "$10,000 to $19,999") {
              affordable_rent +=
                250 * (eke.percentage_of_family_total_income / 100);
            }
          });
          graph_4_3_affordable.push(Math.ceil(affordable_rent / 100));

          const rents = await Services.rentService.getAlls({
            province: ele.province,
            year,
            cma: "NA",
            ca: "NA",
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
          graph_4_3_average_rent_row.push(Math.ceil(row / 4));
          graph_4_3_average_rent_apa.push(Math.ceil(apa / 4));
        })
      );
      let graph_3_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      canadaIncomeSurveyDetails.map((eke) => {
        if (eke.income_bracket === "$100,000 and over") {
          graph_3_1[8] = eke.percentage_of_family_after_tax_income;
        } else if (eke.income_bracket === "$80,000 to $99,999") {
          graph_3_1[7] = eke.percentage_of_family_after_tax_income;
        } else if (eke.income_bracket === "$60,000 to $79,999") {
          graph_3_1[6] = eke.percentage_of_family_after_tax_income;
        } else if (eke.income_bracket === "$50,000 to $59,999") {
          graph_3_1[5] = eke.percentage_of_family_after_tax_income;
        } else if (eke.income_bracket === "$40,000 to $49,999") {
          graph_3_1[4] = eke.percentage_of_family_after_tax_income;
        } else if (eke.income_bracket === "$30,000 to $39,999") {
          graph_3_1[3] = eke.percentage_of_family_after_tax_income;
        } else if (eke.income_bracket === "$20,000 to $29,999") {
          graph_3_1[2] = eke.percentage_of_family_after_tax_income;
        } else if (eke.income_bracket === "$10,000 to $19,999") {
          graph_3_1[1] = eke.percentage_of_family_after_tax_income;
        } else {
          graph_3_1[0] = eke.percentage_of_family_after_tax_income;
        }
      });
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
          ele.rent_value = Math.ceil(ele.rent_value * multiplier?.rent);
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
        cma: "NA",
        ca: "NA",
        year,
      });
      rentProvince.map((ele) => {
        if (rent_source === "Average Listing Rent") {
          ele.rent_value = Math.ceil(ele.rent_value * multiplier?.rent);
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
        cma: "NA",
        ca: "NA",
        year,
      });
      rentCanada.map((ele) => {
        if (rent_source === "Average Listing Rent") {
          ele.rent_value = Math.ceil(ele.rent_value * multiplier?.rent);
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
      const graph_3_2_val = [];
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
          canadaIncomeSurveyDetails.map((ele) => {
            total +=
              (ele.median_after_tax -
                cost_of_non_shelter_necessity -
                graph_4_1_canada[6]) *
              (ele.percentage_of_family_after_tax_income / 100);
          });
          graph_3_2_val.push(Math.ceil(total));
        })
      );

      let house_constructed_all_row = 0;
      let house_constructed_rental_row = 0;
      let house_constructed_owned_row = 0;
      let house_constructed_all_apa = 0;
      let house_constructed_rental_apa = 0;
      let house_constructed_owned_apa = 0;
      dwellingDetailss.map((ele) => {
        if (ele.house_type === "Row") {
          house_constructed_all_row += ele.house_constructed_all;
          house_constructed_rental_row += ele.house_constructed_rental;
          house_constructed_owned_row += ele.house_constructed_owned;
        } else {
          house_constructed_all_apa += ele.house_constructed_all;
          house_constructed_rental_apa += ele.house_constructed_rental;
          house_constructed_owned_apa += ele.house_constructed_owned;
        }
      });
      const rental_share_row =
        house_constructed_rental_row ?? 1 / house_constructed_all_row ?? 5;
      const owner_share_row =
        house_constructed_owned_row ?? 1 / house_constructed_all_row ?? 5;
      const rental_share_apa =
        house_constructed_rental_apa ?? 1 / house_constructed_all_apa ?? 5;
      const owner_share_apa =
        house_constructed_owned_apa ?? 1 / house_constructed_all_apa ?? 5;
      const dwellingDetailsPast = await Services.dwellingTypeService.getAlls({
        province,
        year: String(Number(year - 1)),
        cma,
        ca,
      });
      let apartmentTotalPast = 0;
      let rowTotalPast = 0;
      dwellingDetailsPast.forEach((ele) => {
        if (ele.house_type === "Apartment") {
          apartmentTotalPast += ele.units;
        } else {
          rowTotalPast += ele.units;
        }
      });
      let dwellingDetailsaPast = [];
      dwellingDetailsPast.map((ele) => {
        let bedroom_percentage = 0;
        if (ele.house_type === "Apartment") {
          bedroom_percentage = ele.units / apartmentTotalPast;
        } else {
          bedroom_percentage = ele.units / rowTotalPast;
        }
        dwellingDetailsaPast.push({
          ...ele.dataValues,
          bedroom_percentage: Number(bedroom_percentage.toFixed(2)),
        });
      });
      let dwellingDetailssPast = [];

      await Promise.all(
        dwellingDetailsaPast.map(async (ele) => {
          const vacancyRate = await Services.vacancyRateService.getDetail({
            province,
            cma,
            ca,
            year: String(Number(year - 1)),
            bedroom_type: ele.bedroom_type,
            house_type: ele.house_type,
          });

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
          dwellingDetailssPast.push(obj);
        })
      );
      let house_constructed_all_row_past = 0;
      let house_constructed_rental_row_past = 0;
      let house_constructed_owned_row_past = 0;
      let house_constructed_all_apa_past = 0;
      let house_constructed_rental_apa_past = 0;
      let house_constructed_owned_apa_past = 0;
      dwellingDetailssPast.map((ele) => {
        if (ele.house_type === "Row") {
          house_constructed_all_row_past += ele.house_constructed_all;
          house_constructed_rental_row_past += ele.house_constructed_rental;
          house_constructed_owned_row_past += ele.house_constructed_owned;
        } else {
          house_constructed_all_apa_past += ele.house_constructed_all;
          house_constructed_rental_apa_past += ele.house_constructed_rental;
          house_constructed_owned_apa_past += ele.house_constructed_owned;
        }
      });
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
        rowTotalOccupied,
        apartmentTotalOccupied,
        rowTotalAva: Math.ceil(rowTotalAva),
        apartmentTotalAva: Math.ceil(apartmentTotalAva),
        apaUnitsAva,
        rowUnitsAva,
        cost_of_non_shelter_necessity: Math.ceil(
          cost_of_non_shelter_necessity / 1000
        ),
        apaUnitsAdded,
        rowUnitsAdded,
        rowTotalAdded,
        apartmentTotalAdded,
        dwellingDetailss,
        unaffordable_apartment_available,
        unaffordable_row_available,
        affordable_apartment_available,
        affordable_row_available,
        unaffordable_apartment_constructed,
        unaffordable_row_constructed,
        affordable_apartment_constructed,
        affordable_row_constructed,
        unaffordable_apartment_occupied,
        unaffordable_row_occupied,
        affordable_apartment_occupied,
        affordable_row_occupied,
        affordable_apartment,
        affordable_row,
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
