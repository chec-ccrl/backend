"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("householdIncomes", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      Province: {
        type: Sequelize.STRING,
      },
      CSD: {
        type: Sequelize.STRING,
      },
      CMA: {
        type: Sequelize.STRING,
      },
      CMA_CA_mapping: {
        type: Sequelize.STRING,
      },
      CA: {
        type: Sequelize.STRING,
      },
      house_type: {
        type: Sequelize.STRING,
      },
      median_after_tax: {
        type: Sequelize.STRING,
      },
      median_after_tax: {
        type: Sequelize.BOOLEAN,
      },
      median_before_tax: {
        type: Sequelize.BOOLEAN,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      household_including_census_family: {
        type: Sequelize.INTEGER,
      },
      census_family_household: {
        type: Sequelize.INTEGER,
      },
      household_only_one_census_family_without_additional_person: {
        type: Sequelize.INTEGER,
      },
      one_couple_with_or_without_child: {
        type: Sequelize.INTEGER,
      },
      without_child: {
        type: Sequelize.INTEGER,
      },
      with_child: {
        type: Sequelize.INTEGER,
      },
      one_parent: {
        type: Sequelize.INTEGER,
      },
      one_parent_man: {
        type: Sequelize.INTEGER,
      },
      one_parent_women: {
        type: Sequelize.INTEGER,
      },
      other_census_family: {
        type: Sequelize.INTEGER,
      },
      non_census_family: {
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
    await queryInterface.dropTable("householdIncomes");
  },
};
