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
      rent: {
        type: Sequelize.DOUBLE,
      },
      utility: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      paranoid: true,
    }
  );

  return multiplier;
};
