const Controllers = require("../controller");

module.exports = (router) => {
  router.route("/detail/pdf").post(Controllers.detailedResult.result);

  router.route("/simple/pdf").post(Controllers.overviewResult.result);

  router.route("/cma_ca").get(Controllers.detailedResult.getGeo);
};
