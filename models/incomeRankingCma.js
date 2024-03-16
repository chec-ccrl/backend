module.exports = (sequelize, Sequelize) => {
  const incomeRankingCma = sequelize.define(
    "incomeRankingCmas",
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

  return incomeRankingCma;
};
