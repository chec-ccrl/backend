const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/rent")
    .get(Controllers.rent.getAll)
    .post(Controllers.rent.create);

  router
    .route("/admin/rent/:rentId")
    .get(Controllers.rent.getDetail)
    .delete(Controllers.rent.delete)
    .put(Controllers.rent.update);
};
