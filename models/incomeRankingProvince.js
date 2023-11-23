module.exports = (sequelize, Sequelize) => {
  const incomeRankingProvince = sequelize.define(
    "incomeRankingProvinces",
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
      ranking: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return incomeRankingProvince;
};
