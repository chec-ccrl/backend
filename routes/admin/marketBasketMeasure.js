const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/marketBasketMeasure")
    .get(Controllers.marketBasketMeasure.getAll)
    .post(Controllers.marketBasketMeasure.create);
  router
    .route("/admin/marketBasketMeasure/excel")
    .get(Controllers.marketBasketMeasure.addExcelFiles);

  router
    .route("/admin/marketBasketMeasure/:marketBasketMeasureId")
    .get(Controllers.marketBasketMeasure.getDetail)
    .delete(Controllers.marketBasketMeasure.delete)
    .put(Controllers.marketBasketMeasure.update);
};
