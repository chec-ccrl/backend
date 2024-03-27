const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/rental/ranking/cma")
    .get(Controllers.rentalRankingCMA.getAll)
    .post(Controllers.rentalRankingCMA.create);

  router
    .route("/admin/rental/ranking/cma/excel")
    .get(Controllers.rentalRankingCMA.addExcelFiles);

  router
    .route("/admin/rental/ranking/cma/excel/upload")
    .post(multerUpload, Controllers.rentalRankingCMA.uploadExcelFiles);

  router
    .route("/admin/rental/ranking/cma/:rentalRankingCMAId")
    .get(Controllers.rentalRankingCMA.getDetail)
    .delete(Controllers.rentalRankingCMA.delete)
    .put(Controllers.rentalRankingCMA.update);
};
