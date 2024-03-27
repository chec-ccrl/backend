const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/rent")
    .get(Controllers.rent.getAll)
    .post(Controllers.rent.create);

  router.route("/admin/rent/excel").get(Controllers.rent.addExcelFiles);
  router
    .route("/admin/rent/excel/upload")
    .post(multerUpload, Controllers.rent.uploadExcelFiles);

  router
    .route("/admin/rent/:rentId")
    .get(Controllers.rent.getDetail)
    .delete(Controllers.rent.delete)
    .put(Controllers.rent.update);
};
