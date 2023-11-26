const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/ranking/province/excel")
    .get(Controllers.ranking.addExcelProvince);
  router.route("/admin/ranking/ca/excel").get(Controllers.ranking.addExcelCa);
  router.route("/admin/ranking/cma/excel").get(Controllers.ranking.addExcelCma);
};
