const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Should get password and username
async function login(info) {
  if (!(info.username && info.password)) {
    return "Missing property. username / password";
  }
  const user = await User.findOne({ username: info.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(
          info.password.toString(),
          user.password.toString()
        );

  if (!(user && passwordCorrect)) {
    return "invalid username or password";
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // Sign new token - 1 hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  return { token: token, username: user.username, name: user.name };
}

module.exports = { login };
