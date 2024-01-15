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
      year: {
        type: Sequelize.INTEGER,
      },
      province: {
        type: Sequelize.STRING,
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

  return incomeRankingProvince;
};
