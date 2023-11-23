"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("completeHousings", "bedroom_type", {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("completeHousings", "bedroom_type");
  },
};
