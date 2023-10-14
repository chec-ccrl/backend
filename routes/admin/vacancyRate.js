const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/vacancy/rate")
    .get(Controllers.vacancyRate.getAll)
    .post(Controllers.vacancyRate.create);

  router
    .route("/admin/vacancy/rate/:vacancyRateId")
    .get(Controllers.vacancyRate.getDetail);
};
