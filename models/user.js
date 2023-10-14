module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
      },
      pdf_url: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );

  return user;
};
