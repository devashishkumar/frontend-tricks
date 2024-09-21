var express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
var router = express.Router();
const Event = require("./../models/event");

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
        return Event.find()
          .then((events) => {
            return events.map((event) => {
              return { ...event._doc, _id: event.id.toString() };
            });
          })
          .catch((err) => {
            return err;
          });
        // return events;
      },
      createEvent: (args) => {
        // const event = {
        //   _id: Math.random().toString(),
        //   title: args.eventInput.title,
        //   description: args.eventInput.description,
        //   price: +args.eventInput.price,
        //   date: new Date().toISOString()
        // };
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        // now saving to mongodb database
        return event
          .save()
          .then((result) => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
        return event;
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
