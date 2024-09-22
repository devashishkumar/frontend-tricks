var express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
var router = express.Router();
const Event = require("./../models/event");
const User = require("./../models/user");

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
      type User {
      _id: ID!
      email: String!
      password: String!
      }
      input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
      }
      input UserInput {
      email: String!
      password: String!
      }
      type RootQuery {
      events: [Event!]!
      }
      type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
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
      createUser: (args) => {
        return bcrypt
          .hash(args.userInput.password, 12)
          .then((hashPasssword) => {
            const user = new User({
              email: args.userInput.email,
              password: hashPasssword,
            });
            return user
              .save()
              .then((result) => {
                return { ...result._doc, _id: result._doc._id.toString() };
              })
              .catch((err) => {
                throw err;
              });
          })
          .catch((err) => {
            throw err;
          });
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
