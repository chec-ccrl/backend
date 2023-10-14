const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/dwelling/type")
    .get(Controllers.dwellingType.getAll)
    .post(Controllers.dwellingType.create);

  router
    .route("/admin/dwelling/type/:dwellingTypeId")
    .get(Controllers.dwellingType.getDetail);
};
