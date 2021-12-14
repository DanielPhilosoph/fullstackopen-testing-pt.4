const router = require("express").Router();
const { login } = require("../utils/login");

router.post("/", async (request, response) => {
  const loginResponse = await login(request.body);
  if (typeof loginResponse === "string") {
    response.status(401).send(loginResponse);
  } else {
    response.status(200).send(loginResponse);
  }
});

module.exports = router;
