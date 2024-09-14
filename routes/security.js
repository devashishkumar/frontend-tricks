var express = require("express");
var router = express.Router();

function cspHeaders(req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';" +
      "script-src 'self' 'nonce-appRandomKey' 'unsafe-inline' https://code.jquery.com https://cdn.jsdelivr.net;"
  );
  next();
}

function iframeProtection(req, res, next) {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  next();
}

/* GET home page. */
router.get("/", iframeProtection, function (req, res, next) {
  res.render("security/index", { title: "Express" });
});

router.get("/iframe", function (req, res, next) {
  res.render("security/iframe", { title: "Express" });
});

router.get("/preventjsfromurl", cspHeaders, function (req, res, next) {
  res.render("security/preventjsfromurl", { title: "Express" });
});

module.exports = router;
