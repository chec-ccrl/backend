module.exports = (sequelize, Sequelize) => {
  const rent = sequelize.define(
    "rents",
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
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );

  return rent;
};
