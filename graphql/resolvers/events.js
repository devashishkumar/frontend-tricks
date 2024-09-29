const Event = require("./../../models/event");
const User = require("./../../models/user");
const { user, transformBooking, transformEvent } = require("./modelhelpers");

const USERID = "66efc1957c08bdea5be34454";

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      events.map((event) => {
        return transformEvent(event);
      });
      return events;
    } catch (err) {
      throw err;
    }
  },
  bookings: async (args) => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
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
      creator: USERID,
    });
    let createdEvent;
    // now saving to mongodb database
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creatorId = await User.findById(USERID);
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
};
