"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("incomeRankingCas", "ranking"),
      queryInterface.removeColumn("incomeRankingCmas", "ranking"),
      queryInterface.removeColumn("incomeRankingProvinces", "ranking"),
      queryInterface.removeColumn("rentalRankingCas", "ranking"),
      queryInterface.removeColumn("rentalRankingProvinces", "ranking"),
      queryInterface.removeColumn("rentalRankingCmas", "ranking"),
      queryInterface.addColumn("incomeRankingCas", "ranking_before_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingCas", "ranking_after_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingCmas", "ranking_before_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingCmas", "ranking_after_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingProvinces", "ranking_before_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("incomeRankingProvinces", "ranking_after_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingCas", "ranking_before_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingCas", "ranking_after_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingCmas", "ranking_before_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingCmas", "ranking_after_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingProvinces", "ranking_before_tax", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("rentalRankingProvinces", "ranking_after_tax", {
        type: Sequelize.INTEGER,
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("canadaIncomeSurveys", "market_income", {
      type: Sequelize.DOUBLE,
    });
  },
};
