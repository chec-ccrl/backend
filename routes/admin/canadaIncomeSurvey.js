const Controllers = require("../../controller");

module.exports = (router) => {
  router
    .route("/admin/canada/income/survey")
    .get(Controllers.canadaIncomeSurvey.getAll)
    .post(Controllers.canadaIncomeSurvey.create);

  router
    .route("/admin/canada/income/survey/excel")
    .get(Controllers.canadaIncomeSurvey.addExcelFiles);

  router
    .route("/admin/canada/income/survey/:canadaIncomeSurveyId")
    .get(Controllers.canadaIncomeSurvey.getDetail)
    .delete(Controllers.canadaIncomeSurvey.delete)
    .put(Controllers.canadaIncomeSurvey.update);
};
