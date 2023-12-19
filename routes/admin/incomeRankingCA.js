const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/income/ranking/ca")
    .get(Controllers.incomeRankingCA.getAll)
    .post(Controllers.incomeRankingCA.create);
  router
    .route("/admin/income/ranking/ca/excel")
    .get(Controllers.incomeRankingCA.addExcelFiles);

  router
    .route("/admin/income/ranking/ca/:incomeRankingCAId")
    .get(Controllers.incomeRankingCA.getDetail)
    .delete(Controllers.incomeRankingCA.delete)
    .put(Controllers.incomeRankingCA.update);
};
