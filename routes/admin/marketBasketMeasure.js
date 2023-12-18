const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/market/basket/measure")
    .get(Controllers.marketBasketMeasure.getAll)
    .post(Controllers.marketBasketMeasure.create);
  router
    .route("/admin/market/basket/measure/:marketBasketMeasureId")
    .get(Controllers.marketBasketMeasure.getDetail)
    .delete(Controllers.marketBasketMeasure.delete)
    .put(Controllers.marketBasketMeasure.update);
};
