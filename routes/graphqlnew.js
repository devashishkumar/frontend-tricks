var express = require("express");
const { graphqlHTTP } = require("express-graphql");
var router = express.Router();

const graphQlSchema = require("./../graphql/schema/index");
const graphQlResolvers = require("./../graphql/resolvers/index");

const isAuth = require("./../middlewares/is-auth");

router.use(isAuth);
router.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ name: "Ashish" });
});

module.exports = router;
