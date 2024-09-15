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
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  next();
}

function removeHeader(req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
}

function referralHeader(req, res, next) {
  res.removeHeader("Referrer-Policy", "no-referrer");
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

router.get("/powerby", removeHeader, function (req, res, next) {
  res.render("security/powerby", { title: "Express" });
});

router.get("/disablereferralheader", referralHeader, function (req, res, next) {
  res.render("security/powerby", { title: "Express" });
});

module.exports = router;
