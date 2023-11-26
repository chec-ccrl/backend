module.exports = (sequelize, Sequelize) => {
  const marketBasketMeasure = sequelize.define(
    "marketBasketMeasures",
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
      popuplation_type: {
        type: Sequelize.STRING,
      },
      city: {
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
      cost: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      paranoid: true,
    }
  );

  return marketBasketMeasure;
};
