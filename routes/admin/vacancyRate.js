const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/vacancy/rate")
    .get(Controllers.vacancyRate.getAll)
    .post(Controllers.vacancyRate.create);
  router
    .route("/admin/vacancy/rate/excel")
    .get(Controllers.vacancyRate.addExcelFiles);

  router
    .route("/admin/vacancy/rate/excel/upload")
    .post(multerUpload, Controllers.vacancyRate.uploadExcelFiles);

  router
    .route("/admin/vacancy/rate/:vacancyRateId")
    .get(Controllers.vacancyRate.getDetail)
    .delete(Controllers.vacancyRate.delete)
    .put(Controllers.vacancyRate.update);
};
