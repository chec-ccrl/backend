const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/rental/ranking/province")
    .get(Controllers.rentalRankingProvince.getAll)
    .post(Controllers.rentalRankingProvince.create);

  router
    .route("/admin/rental/ranking/province/:rentalRankingProvinceId")
    .get(Controllers.rentalRankingProvince.getDetail)
    .delete(Controllers.rentalRankingProvince.delete)
    .put(Controllers.rentalRankingProvince.update);
};
