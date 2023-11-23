const logger = require("../util/logger");
module.exports = {
  detailPdfGenerator: async (data) => {
    try {
      const body = `<html>
      <head>
      <link rel="stylesheet" type="text/css" href="http://getbootstrap.com/dist/css/bootstrap.min.css">
      <style>
        body {
          padding: 1cm;
        }
    
        .jumbotron {
          background: #F0F0F0!important;
        }
    
        .btn {
          background: rgb(66,133,243)!important;
        }
      </style>
      <body>
        <div id="pageHeader">
          <div class="container">
            <br/>
            <span class="label label-default">With external css</span>
          </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-4">hi</div>
                <div class="col-4">hi</div>
                <div class="col-4">hi</div>
            </div>
        </div>
    
        <div class="container">
          <div class="jumbotron">
            <h1>Navbar example</h1>
            <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
            <p>To see the difference between static and fixed top navbars, just scroll.</p>
            <p>
              <a class="btn btn-lg btn-primary" href="http://getbootstrap.com/components/#navbar" role="button">View navbar docs &raquo;</a>
            </p>
          </div>
        </div>
      </body>
    </html>
      `;
      return body;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  simplePdfGenerator: async (data) => {
    try {
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
};
