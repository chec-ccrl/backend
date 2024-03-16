const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/rental/ranking/ca")
    .get(Controllers.rentalRankingCA.getAll)
    .post(Controllers.rentalRankingCA.create);
  router
    .route("/admin/rental/ranking/ca/excel")
    .get(Controllers.rentalRankingCA.addExcelFiles);

  router
    .route("/admin/rental/ranking/ca/:rentalRankingCAId")
    .get(Controllers.rentalRankingCA.getDetail)
    .delete(Controllers.rentalRankingCA.delete)
    .put(Controllers.rentalRankingCA.update);
};
