const bcrypt = require("bcrypt");
const User = require("../models/user");

async function addUser(user) {
  if (user.password && user.username && user.name) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(
      user.password.toString(),
      saltRounds
    );

    const newUser = new User({
      username: user.username,
      name: user.name,
      password: passwordHash,
    });

    return await newUser.save();
  } else {
    return "Missing property. password / username / name";
  }
}

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

module.exports = { addUser, getAllUsers };
