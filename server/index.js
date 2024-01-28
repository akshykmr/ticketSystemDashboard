const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const HttpStatus = require("http-status");
// const ApiError = require("./src/utils/apiError");
// const { errorConverter, errorHandler } = require("./middlewares/error.js");
const routes = require("./src/routes/index");
require("dotenv/config.js");

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res, next) => {
//   res.status(HttpStatus.OK).send("Welcome to Ticket Management System");
// });

app.use("/", routes);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new ApiError(HttpStatus.NOT_FOUND, "Api not found");
//   return next(err);
// });

// convert error to ApiError, if needed
// app.use(errorConverter);

// handle error
// app.use(errorHandler);

const mongoUrl = process.env.DB_URL;
const PORT = process.env.PORT || 5001;

mongoose
  .connect(mongoUrl)
  .then(() => console.log(`Successfully connected to MongoDB`))
  .catch((err) =>
    console.error(`Connection to "${mongoUrl}" failed because ${err.message}`)
  );

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app; 