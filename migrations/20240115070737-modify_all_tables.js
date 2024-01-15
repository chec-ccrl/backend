"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("dwellingTypes", "census_subdivision"),
      queryInterface.removeColumn("dwellingTypes", "CMA_CA_mapping"),
      queryInterface.removeColumn("dwellingTypes", "CMA"),
      queryInterface.removeColumn("dwellingTypes", "CA"),
      queryInterface.removeColumn("dwellingTypes", "intended_market"),
      queryInterface.removeColumn("dwellingTypes", "apartment"),
      queryInterface.removeColumn("dwellingTypes", "row_house"),
      queryInterface.addColumn("dwellingTypes", "cma", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("dwellingTypes", "ca", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("dwellingTypes", "house_type", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("dwellingTypes", "units", {
        type: Sequelize.INTEGER,
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("canadaIncomeSurveys", "market_income", {
      type: Sequelize.DOUBLE,
    });
  },
};
