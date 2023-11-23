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
      cma: {
        type: Sequelize.STRING,
      },
      ranking: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return incomeRankingCma;
};
