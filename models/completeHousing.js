module.exports = (sequelize, Sequelize) => {
  const completeHousing = sequelize.define(
    "completeHousings",
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
      geography: {
        type: Sequelize.STRING,
      },
      geography_type: {
        type: Sequelize.STRING,
      },
      intended_market: {
        type: Sequelize.STRING,
      },
      bedroom_type: {
        type: Sequelize.STRING,
      },
      house_type: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      units: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return completeHousing;
};
