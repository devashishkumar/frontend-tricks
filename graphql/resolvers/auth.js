const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  },
  login: async ({ email, password }) => {
    const userDetails = await User.findOne({ email: email });
    if (!userDetails) {
      throw new Error("User does not exist");
    }
    const passwordCheck = await bcrypt.compare(password, userDetails.password);
    if (!passwordCheck) {
      throw new Error("Incorrect Password");
    }
    const token = await jwt.sign(
      { userId: userDetails.id, email: userDetails.email },
      "secretkey",
      {
        expiresIn: "1h",
      }
    );
    return { userId: userDetails.id, token: token, tokenExpiration: 1 };
  },
};
