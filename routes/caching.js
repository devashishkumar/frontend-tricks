var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/service-worker", function (req, res, next) {
  res.render("caching/service-worker");
});

module.exports = router;
