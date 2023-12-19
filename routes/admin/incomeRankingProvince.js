const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/income/ranking/province")
    .get(Controllers.incomeRankingProvince.getAll)
    .post(Controllers.incomeRankingProvince.create);

  router
    .route("/admin/income/ranking/province/excel")
    .get(Controllers.incomeRankingProvince.addExcelFiles);

  router
    .route("/admin/income/ranking/province/:incomeRankingCAId")
    .get(Controllers.incomeRankingProvince.getDetail)
    .delete(Controllers.incomeRankingProvince.delete)
    .put(Controllers.incomeRankingProvince.update);
};
