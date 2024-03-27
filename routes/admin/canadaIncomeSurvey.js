const Controllers = require("../../controller");
const multerUpload = require("../../middleware/multer");

module.exports = (router) => {
  router
    .route("/admin/canada/income/survey")
    .get(Controllers.canadaIncomeSurvey.getAll)
    .post(Controllers.canadaIncomeSurvey.create);

  router
    .route("/admin/canada/income/survey/excel")
    .get(Controllers.canadaIncomeSurvey.addExcelFiles);
  router
    .route("/admin/canada/income/survey/excel/upload")
    .post(multerUpload, Controllers.canadaIncomeSurvey.uploadExcelFiles);

  router
    .route("/admin/canada/income/survey/:canadaIncomeSurveyId")
    .get(Controllers.canadaIncomeSurvey.getDetail)
    .delete(Controllers.canadaIncomeSurvey.delete)
    .put(Controllers.canadaIncomeSurvey.update);
};
