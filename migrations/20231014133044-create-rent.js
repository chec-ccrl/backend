"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rents", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      province: {
        type: Sequelize.STRING,
      },
      geography: {
        type: Sequelize.STRING,
      },
      geography_type: {
        type: Sequelize.STRING,
      },
      house_type: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
      rent_value: {
        type: Sequelize.INTEGER,
      },
      bedroom_type: {
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
    await queryInterface.dropTable("rents");
  },
};
