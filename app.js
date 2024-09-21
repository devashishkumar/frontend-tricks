var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var securityRouter = require("./routes/security");
var restApi = require("./routes/restapi");
var graphQl = require("./routes/graphql");
var graphQlNew = require("./routes/graphqlnew");
var serverEvent = require("./routes/serverevents");
var cookieRouter = require("./routes/cookie");
var indexdbRouter = require("./routes/indexdb");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
var mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(ejsLayouts);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/security", securityRouter);
app.use("/api", restApi);
app.use("/graphql", graphQl);
app.use("/graphqlnew", graphQlNew);
app.use("/serverevent", serverEvent);
app.use("/cookie", cookieRouter);
app.use("/indexdb", indexdbRouter);

// mongodb connect from mongodb atlas (cloud)

// try {
//   mongoose
//     .connect("mongodb+srv://kumarashish0512:<db_password>@graphql.f9rwv.mongodb.net/")
//     .then(() => {
//       console.log("connected");
//     })
//     .catch((err) => {
//       console.log("connection error", err);
//     });
// } catch (error) {
//   console.error("error", error);
// }

// mondodb connect from local machine mongodb
try {
  mongoose
    .connect("mongodb://127.0.0.1:27017/newdb")
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("connection error", err);
    });
} catch (error) {
  console.error("error", error);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
