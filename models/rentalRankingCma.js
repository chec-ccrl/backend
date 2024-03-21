module.exports = (sequelize, Sequelize) => {
  const rentalRankingCma = sequelize.define(
    "rentalRankingCmas",
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

  return rentalRankingCma;
};
