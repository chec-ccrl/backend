module.exports = (sequelize, Sequelize) => {
  const rentalRankingCa = sequelize.define(
    "rentalRankingCas",
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
      ca: {
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

  return rentalRankingCa;
};
