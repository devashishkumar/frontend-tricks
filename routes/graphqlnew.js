var express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
var router = express.Router();

const events = [];

router.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      }
      input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
      }
      type RootQuery {
      events: [Event!]!
      }
      type RootMutation {
      createEvent(eventInput: EventInput): Event
      }
      schema {
      query: RootQuery
      mutation: RootMutation
      }
      `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.title,
          description: args.description,
          price: +args.price,
          date: new Date().toISOString()
        };
        events.push(event);
      },
    },
    graphiql: true,
  })
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ name: "Ashish" });
});

module.exports = router;
