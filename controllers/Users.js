const router = require("express").Router();
const { getAllUsers, addUser } = require("../utils/user_helper");

//TODO add new user
router.post("/", async (request, response) => {
  const user = await addUser(request.body);
  if (typeof user !== "string") {
    response.status(201).send(user);
  } else {
    response.status(400).send(user);
  }
});

//TODO get all users from DB
router.get("/", async (request, response) => {
  const users = await getAllUsers();
  response.status(200).send(users);
});

module.exports = router;
