"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("rentalRankingCas", "ranking", {
      type: Sequelize.INTEGER,
    }),
      queryInterface.addColumn("rentalRankingProvinces", "ranking", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingCmas", "ranking", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.removeColumn("rentalRankingCas", "ranking_before_tax"),
      queryInterface.removeColumn("rentalRankingCas", "ranking_after_tax"),
      queryInterface.removeColumn("rentalRankingCmas", "ranking_before_tax"),
      queryInterface.removeColumn("rentalRankingCmas", "ranking_after_tax"),
      queryInterface.removeColumn(
        "rentalRankingProvinces",
        "ranking_before_tax"
      ),
      queryInterface.removeColumn(
        "rentalRankingProvinces",
        "ranking_after_tax"
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("canadaIncomeSurveys", "market_income", {
      type: Sequelize.DOUBLE,
    });
  },
};
