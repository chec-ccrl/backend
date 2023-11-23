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
      income_bracket: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      total_income: {
        type: Sequelize.DOUBLE,
      },
      after_tax_income: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      paranoid: true,
    }
  );

  return canadaIncomeSurvey;
};
