module.exports = (sequelize, Sequelize) => {
  const canadaIncomeSurvey = sequelize.define(
    "canadaIncomeSurveys",
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
      cma: {
        type: Sequelize.STRING,
      },
      ca: {
        type: Sequelize.STRING,
      },
      income_bracket: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      percentage_of_family_total_income: {
        type: Sequelize.DOUBLE,
      },
      percentage_of_family_after_tax_income: {
        type: Sequelize.DOUBLE,
      },
      median_before_tax: {
        type: Sequelize.DOUBLE,
      },
      median_after_tax: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      paranoid: true,
    }
  );

  return canadaIncomeSurvey;
};
