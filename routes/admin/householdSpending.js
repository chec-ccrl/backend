const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/householdSpending")
    .get(Controllers.householdSpending.getAll)
    .post(Controllers.householdSpending.create);
  router
    .route("/admin/householdSpending/excel")
    .get(Controllers.householdSpending.addExcelFiles);

  router
    .route("/admin/householdSpending/:householdSpendingId")
    .get(Controllers.householdSpending.getDetail)
    .delete(Controllers.householdSpending.delete)
    .put(Controllers.householdSpending.update);
};
