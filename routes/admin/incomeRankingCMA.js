const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/income/ranking/cma")
    .get(Controllers.incomeRankingCMA.getAll)
    .post(Controllers.incomeRankingCMA.create);

  router
    .route("/admin/income/ranking/cma/excel")
    .get(Controllers.incomeRankingCMA.addExcelFiles);
  router
    .route("/admin/income/ranking/cma/:incomeRankingCMAId")
    .delete(Controllers.incomeRankingCMA.delete)
    .put(Controllers.incomeRankingCMA.update);
};
