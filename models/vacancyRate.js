module.exports = (sequelize, Sequelize) => {
  const vacancyRate = sequelize.define(
    "vacancyRates",
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
      bedroom_type: {
        type: Sequelize.INTEGER,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      vacancy_rate: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return vacancyRate;
};
