var express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
var router = express.Router();
const Event = require("./../models/event");
const User = require("./../models/user");

/**
 * @param userId userid
 * @returns user details by id
 */
const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * @param eventIds event id
 * @returns get events
 */
const events = (eventIds) => {
  return Event.find({ _id: { $in: eventIds } })
    .then((events) => {
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event.creator),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

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
      creator: User!
      }
      type User {
      _id: ID!
      email: String!
      password: String!
      createdEvents: [Event!]
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
              return {
                ...event._doc,
                _id: event.id.toString(),
                creator: user.bind(this, event._doc.creator),
              };
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
          creator: "66efc1957c08bdea5be34454",
        });
        let createdEvent;
        // now saving to mongodb database
        return event
          .save()
          .then((result) => {
            createdEvent = { ...result._doc, _id: result._doc._id.toString() };
            return User.findById("66efc1957c08bdea5be34454");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User not found.");
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then((result) => {
            console.log(result);
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
        return event;
      },
      createUser: (args) => {
        return User.findOne({ email: args.userInput.email })
          .then((user) => {
            if (user) {
              throw new Error("User Exist, Please try another email");
            } else {
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
                      return {
                        ...result._doc,
                        password: null,
                        _id: result._doc._id.toString(),
                      };
                    })
                    .catch((err) => {
                      throw err;
                    });
                })
                .catch((err) => {
                  throw err;
                });
            }
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
