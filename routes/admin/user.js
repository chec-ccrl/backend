const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/user")
    .get(Controllers.user.getAll)
    .post(Controllers.user.create);

  router.route("/admin/user/:userId").get(Controllers.user.getDetail);
};
