var express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
var router = express.Router();

router.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type RootQuery {
      events: [String!]!
      }
      type RootMutation {
      createEvent(name: String): String
      }
      schema {
      query: RootQuery
      mutation: RootMutation
      }
      `),
    rootValue: {
      events: () => {
        return ["Cooking", "Swimming"];
      },
      createEvent: (args) => {
        return args.name;
      }
    },
    graphiql: true
  }));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ name: "Ashish" });
});

module.exports = router;
