const bcrypt = require("bcrypt");
const User = require("../models/user");

async function addUser(user) {
  if (user.password && user.username) {
    if (user.password.toString().length < 3) {
      return "Password is to short";
    }
    if (user.username.length < 3) {
      return "User name is to short";
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(
      user.password.toString(),
      saltRounds
    );

    const newUser = new User({
      username: user.username,
      name: user.name,
      password: passwordHash,
      blogs: [],
    });

    return await newUser.save();
  } else {
    return "Missing property. password / username";
  }
}

async function getAllUsers() {
  const users = await User.find({}).populate("blogs");
  return users;
}

module.exports = { addUser, getAllUsers };
