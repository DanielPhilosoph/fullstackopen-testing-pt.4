const { describe, test, expect } = require("@jest/globals");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

let api = supertest(app);

const data = [
  {
    username: "edan",
    name: "pianissim7",
    password: 12345,
  },
  {
    username: "michal",
    name: "mishmish",
    password: 678910,
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(data);
});

describe("User api testing unit", () => {
  describe("Get all users", () => {
    test("GET /api/users - could get all users", async () => {
      const response = await api.get("/api/users").expect(200);
      expect(response.body).toHaveLength(data.length);
    });
  });

  describe("Add new user", () => {
    test("Adding a valid user", async () => {
      const newUser = {
        username: "test",
        name: "good test",
        password: 12345,
      };
      const response = await api.post("/api/users").send(newUser).expect(201);
      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBeDefined();
      expect(response.body.username).toBe("test");

      // Did really added?
      const response2 = await api.get("/api/users").expect(200);
      expect(response2.body).toHaveLength(data.length + 1);
    });

    test("Adding a invalid user should not work", async () => {
      const newUser = {
        password: 12345,
      };
      await api.post("/api/users").send(newUser).expect(400);

      const newUser2 = {
        username: "not valid",
      };
      await api.post("/api/users").send(newUser2).expect(400);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
