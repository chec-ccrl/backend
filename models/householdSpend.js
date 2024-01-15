module.exports = (sequelize, Sequelize) => {
  const householdSpend = sequelize.define(
    "householdSpends",
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
      cost: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      paranoid: true,
    }
  );

  return householdSpend;
};
