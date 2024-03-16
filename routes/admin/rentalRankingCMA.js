const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/rental/ranking/cma")
    .get(Controllers.rentalRankingCMA.getAll)
    .post(Controllers.rentalRankingCMA.create);

  router
    .route("/admin/rental/ranking/cma/excel")
    .get(Controllers.rentalRankingCMA.addExcelFiles);

  router
    .route("/admin/rental/ranking/cma/:rentalRankingCMAId")
    .get(Controllers.rentalRankingCMA.getDetail)
    .delete(Controllers.rentalRankingCMA.delete)
    .put(Controllers.rentalRankingCMA.update);
};
