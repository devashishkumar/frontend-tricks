const bcrypt = require("bcryptjs");
const Event = require("./../../models/event");
const User = require("./../../models/user");

/**
 * @param userId userid
 * @returns user details by id
 */
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

/**
 * @param eventIds event id
 * @returns get events
 */
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator),
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      events.map((event) => {
        return {
          ...event._doc,
          _id: event.id.toString(),
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
      return events;
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "66efc1957c08bdea5be34454",
    });
    let createdEvent;
    // now saving to mongodb database
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(result._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
      const creatorId = await User.findById("66efc1957c08bdea5be34454");
      if (!creatorId) {
        throw new Error("User not found.");
      }
      creatorId.createdEvents.push(event);
      await creatorId.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User Exist, Please try another email");
      }
      const hashPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashPassword,
      });
      const result = await user.save();
      if (result) {
        return {
          ...result._doc,
          password: null,
          _id: result._doc._id.toString(),
        };
      }
    } catch (err) {
      throw err;
    }
  },
};
