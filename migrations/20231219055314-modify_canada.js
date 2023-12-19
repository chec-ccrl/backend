"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("canadaIncomeSurveys", "market_income"),
      queryInterface.addColumn("canadaIncomeSurveys", "number_of_family", {
        type: Sequelize.DOUBLE,
      }),
      queryInterface.addColumn("canadaIncomeSurveys", "median_before_tax", {
        type: Sequelize.DOUBLE,
      }),
      queryInterface.addColumn("canadaIncomeSurveys", "median_after_tax", {
        type: Sequelize.DOUBLE,
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("canadaIncomeSurveys", "market_income", {
      type: Sequelize.DOUBLE,
    });
  },
};
