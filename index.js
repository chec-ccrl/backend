const express = require("express");

const router = express.Router();
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const logger = require("./util/logger");
const db = require("./models");

require("./routes")(router);
require("express-ws")(app);
require("dotenv").config();

app.use(morgan("combined", { stream: logger.stream.write }));
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(cookieParser());

const PORT = process.env.SERVER_PORT || 80;

app.use("/", router);

app.listen(PORT, () => {
  db.sequelize
    .authenticate()
    .then(() => {
      logger.info("Connection has been established successfully.");
      db.sequelize
        .sync({ force: false })
        .then(() => {
          logger.info("Database Synced Successfully");
          logger.info(`server started at port ${PORT}`);
        })
        .catch((err) => {
          logger.error(err);
        });
    })
    .catch((err) => {
      logger.error("Unable to connect to the database:", err);
    });
});
