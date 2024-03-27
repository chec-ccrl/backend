const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/household/spend")
    .get(Controllers.householdSpending.getAll)
    .post(Controllers.householdSpending.create);
  router
    .route("/admin/household/spend/excel")
    .get(Controllers.householdSpending.addExcelFiles);

  router
    .route("/admin/household/spend/excel/upload")
    .post(multerUpload, Controllers.householdSpending.uploadExcelFiles);

  router
    .route("/admin/household/spend/:householdSpendingId")
    .get(Controllers.householdSpending.getDetail)
    .delete(Controllers.householdSpending.delete)
    .put(Controllers.householdSpending.update);
};
