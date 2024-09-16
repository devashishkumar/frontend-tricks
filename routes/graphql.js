var express = require("express");
var router = express.Router();
const { graphqlHTTP } = require("express-graphql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ name: "Ashish" });
});

router.get(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
  })
);

module.exports = router;
