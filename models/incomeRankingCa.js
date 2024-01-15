module.exports = (sequelize, Sequelize) => {
  const incomeRankingCa = sequelize.define(
    "incomeRankingCas",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      ca: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      ranking_before_tax: {
        type: Sequelize.INTEGER,
      },
      ranking_after_tax: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return incomeRankingCa;
};
