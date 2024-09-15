var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("serverevents/index");
});

router.get("/sse", function (req, res, next) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write("data: Welcome to Server sent event \n\n");

  const intervalId = setInterval(() => {
    res.write(`data: Server Time ${new Date().toLocaleDateString()} \n\n`);
  }, 5000);

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

module.exports = router;
