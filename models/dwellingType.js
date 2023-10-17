module.exports = (sequelize, Sequelize) => {
  const dwellingType = sequelize.define(
    "dwellingTypes",
    {
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
        type: Sequelize.STRING,
      },
      apartment: {
        type: Sequelize.INTEGER,
      },
      row_house: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return dwellingType;
};
