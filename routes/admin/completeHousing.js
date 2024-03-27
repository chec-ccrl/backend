const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/complete/housing")
    .get(Controllers.completeHousing.getAll)
    .post(Controllers.completeHousing.create);

  router
    .route("/admin/complete/housing/excel")
    .get(Controllers.completeHousing.addExcelFiles);
  router
    .route("/admin/complete/housing/excel/upload")
    .post(multerUpload, Controllers.completeHousing.uploadExcelFiles);
  router
    .route("/admin/complete/housing/:completeHousingId")
    .get(Controllers.completeHousing.getDetail)
    .delete(Controllers.completeHousing.delete)
    .put(Controllers.completeHousing.update);
};
