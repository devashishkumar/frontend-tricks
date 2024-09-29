const { dateToString } = require("./../../helpers/date");
const Booking = require("./../../models/booking");
const Event = require("./../../models/event");
const User = require("./../../models/user");

const transformEvent = (event) => {
    return {
      ...event._doc,
      _id: event.id,
      date: dateToString(event._doc.date),
      creator: user.bind(this, event.creator),
    };
  };
  
  const transformBooking = (booking) => {
    return {
      ...booking._doc,
      _id: booking.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: dateToString(booking._doc.createdAt),
      updatedAt: dateToString(booking._doc.updatedAt),
    };
  };
  
  /**
   * @param eventId event id
   * @returns get event by event id
   */
  const singleEvent = async (eventId) => {
    try {
      const event = await Event.findById(eventId);
      // return {
      //   ...event._doc,
      //   _id: event.id,
      //   createdEvents: events.bind(this, event.createdEvents),
      // };
      return transformEvent(event);
    } catch (err) {
      throw err;
    }
  };
  
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
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  };

  exports.transformEvent = transformEvent;
  exports.transformBooking = transformBooking;
  exports.singleEvent = singleEvent;

  exports.user = user;
  exports.events = events;