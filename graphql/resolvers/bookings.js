const Event = require("./../../models/event");
const Booking = require("./../../models/booking");
const { transformBooking, transformEvent } = require("./modelhelpers");

const USERID = "66efc1957c08bdea5be34454";

module.exports = {
  createBooking: async (args) => {
    try {
      const fetchEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: USERID,
        event: fetchEvent,
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findOne({ _id: args.eventId }).populate(
        "event"
      );
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.eventId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
