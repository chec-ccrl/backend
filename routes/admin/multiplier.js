const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/multiplier")
    .get(Controllers.multiplier.getAll)
    .post(Controllers.multiplier.create);
  router
    .route("/admin/multiplier/excel")
    .get(Controllers.multiplier.addExcelFiles);

  router
    .route("/admin/multiplier/:multiplierId")
    .get(Controllers.multiplier.getDetail)
    .delete(Controllers.multiplier.delete)
    .put(Controllers.multiplier.update);
};
