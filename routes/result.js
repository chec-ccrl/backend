const Controllers = require("../controller");

module.exports = (router) => {
  router.route("/detail/pdf").get(Controllers.detailedResult.result);

  router.route("/simple/pdf").post(Controllers.overviewResult.result);
};
