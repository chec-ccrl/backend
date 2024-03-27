const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/market/basket/measure")
    .get(Controllers.marketBasketMeasure.getAll)
    .post(Controllers.marketBasketMeasure.create);

  router
    .route("/admin/market/basket/measure/excel")
    .get(Controllers.marketBasketMeasure.addExcelFiles);

  router
    .route("/admin/market/basket/measure/excel/upload")
    .post(multerUpload, Controllers.marketBasketMeasure.uploadExcelFiles);

  router
    .route("/admin/market/basket/measure/:marketBasketMeasureId")
    .get(Controllers.marketBasketMeasure.getDetail)
    .delete(Controllers.marketBasketMeasure.delete)
    .put(Controllers.marketBasketMeasure.update);
};
