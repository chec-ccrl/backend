"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dwellingTypes", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      province: {
        type: Sequelize.STRING,
      },
      census_subdivision: {
        type: Sequelize.STRING,
      },
      CMA_CA_mapping: {
        type: Sequelize.STRING,
      },
      CMA: {
        type: Sequelize.STRING,
      },
      CA: {
        type: Sequelize.STRING,
      },
      intended_market: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      bedroom_type: {
        type: Sequelize.INTEGER,
      },
      apartment: {
        type: Sequelize.INTEGER,
      },
      row_house: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dwellingTypes");
  },
};
