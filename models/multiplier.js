module.exports = (sequelize, Sequelize) => {
  const multiplier = sequelize.define(
    "multipliers",
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
      year: {
        type: Sequelize.INTEGER,
      },
      rent: {
        type: Sequelize.DOUBLE,
      },
      utility: {
        type: Sequelize.DOUBLE,
      },
      average_utility: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      paranoid: true,
    }
  );

  return multiplier;
};
