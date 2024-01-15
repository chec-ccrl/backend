"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("canadaIncomeSurveys", "ca", {
      type: Sequelize.STRING,
    }),
      queryInterface.removeColumn("canadaIncomeSurveys", "total_income"),
      queryInterface.removeColumn("canadaIncomeSurveys", "after_tax_income"),
      queryInterface.removeColumn("canadaIncomeSurveys", "number_of_family"),
      queryInterface.removeColumn("completeHousings", "geography"),
      queryInterface.removeColumn("completeHousings", "geography_type"),
      queryInterface.removeColumn("completeHousings", "bedroom_type"),
      queryInterface.removeColumn("marketBasketMeasures", "popuplation_type"),
      queryInterface.removeColumn("marketBasketMeasures", "city"),
      queryInterface.removeColumn("rents", "geography"),
      queryInterface.removeColumn("rents", "geography_type"),
      queryInterface.removeColumn("vacancyRates", "geography"),
      queryInterface.removeColumn("vacancyRates", "geography_type"),
      queryInterface.addColumn(
        "canadaIncomeSurveys",
        "percentage_of_family_total_income",
        {
          type: Sequelize.DOUBLE,
        }
      ),
      queryInterface.addColumn(
        "canadaIncomeSurveys",
        "percentage_of_family_after_tax_income",
        {
          type: Sequelize.DOUBLE,
        }
      ),
      queryInterface.addColumn(
        "canadaIncomeSurveys",
        "number_of_family_total_income",
        {
          type: Sequelize.DOUBLE,
        }
      ),
      queryInterface.addColumn(
        "canadaIncomeSurveys",
        "number_of_family_after_tax_income",
        {
          type: Sequelize.DOUBLE,
        }
      ),
      queryInterface.addColumn("completeHousings", "cma", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("completeHousings", "ca", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("householdSpends", "cma", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("householdSpends", "ca", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("multipliers", "cma", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("multipliers", "ca", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("rents", "cma", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("rents", "ca", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("vacancyRates", "cma", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("vacancyRates", "ca", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("multipliers", "year", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingCas", "year", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingCmas", "year", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingProvinces", "year", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingCas", "year", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingCmas", "year", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingProvinces", "year", {
        type: Sequelize.INTEGER,
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("canadaIncomeSurveys", "market_income", {
      type: Sequelize.DOUBLE,
    });
  },
};
