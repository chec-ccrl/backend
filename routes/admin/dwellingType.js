const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/dwelling/type")
    .get(Controllers.dwellingType.getAll)
    .post(Controllers.dwellingType.create);

  router
    .route("/admin/dwelling/type/excel")
    .get(Controllers.dwellingType.addExcelFiles);
  router
    .route("/admin/dwelling/type/excel/upload")
    .post(multerUpload, Controllers.dwellingType.uploadExcelFiles);

  router
    .route("/admin/dwelling/type/:dwellingTypeId")
    .get(Controllers.dwellingType.getDetail)
    .delete(Controllers.dwellingType.delete)
    .put(Controllers.dwellingType.update);
};
