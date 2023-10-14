const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/complete/housing")
    .get(Controllers.completeHousing.getAll)
    .post(Controllers.completeHousing.create);

  router
    .route("/admin/complete/housing/:completeHousingId")
    .get(Controllers.completeHousing.getDetail);
};
