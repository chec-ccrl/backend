const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/household/income")
    .get(Controllers.householdIncome.getAll)
    .post(Controllers.householdIncome.create);

  router
    .route("/admin/household/income/:householdIncomeId")
    .get(Controllers.householdIncome.getDetail)
    .delete(Controllers.householdIncome.delete)
    .put(Controllers.householdIncome.update);
};
