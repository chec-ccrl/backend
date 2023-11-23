"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("canadaIncomeSurveys", "market_income", {
      type: Sequelize.DOUBLE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("canadaIncomeSurveys", "market_income");
  },
};
