module.exports = (sequelize, Sequelize) => {
  const provinceList = sequelize.define("provinceLists", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    province: {
      type: Sequelize.STRING,
    },
    abbr: {
      type: Sequelize.STRING,
    },
  });

  return provinceList;
};
