const bcrypt = require("bcryptjs");
const User = require("./../../models/user");

const USERID = "66efc1957c08bdea5be34454";

module.exports = {
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
  }
};
