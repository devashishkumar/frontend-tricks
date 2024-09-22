const bcrypt = require("bcryptjs");
const Event = require("./../../models/event");
const User = require("./../../models/user");

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
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          return {
            ...event._doc,
            _id: event.id.toString(),
            date: new Date(event._doc.date).toISOString(),
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
        createdEvent = {
          ...result._doc,
          _id: result._doc._id.toString(),
          date: new Date(result._doc.date).toISOString(),
          creator: user.bind(this, result._doc.creator),
        };
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
};
