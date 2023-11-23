const Controllers = require("../controller");

module.exports = (router) => {
  router.route("/detail/pdf").post(Controllers.pdf.detailPdf);

  router.route("/simple/pdf").post(Controllers.pdf.simplePdf);
};
