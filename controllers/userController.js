// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userController = express.Router();

// Seed Data
const userSeeds = [
  {
    name: "user01",
    email: "user01@user.com",
    password: bcrypt.hashSync("123456", saltRounds),
  },
  {
    name: "user02",
    email: "user02@user.com",
    password: bcrypt.hashSync("123456", saltRounds),
  },
  {
    name: "user03",
    email: "user03@user.com",
    password: bcrypt.hashSync("123456", saltRounds),
  },
];

// Generic Get Route
userController.get("/", (req, res) => {
  res.send({ msg: "Welcome to the user get route" });
});

// Seeed Route
userController.get("/seed", async (req, res) => {
  try {
    await prisma.User.deleteMany({ where: {} });
    await prisma.User.createMany({
      data: userSeeds,
    });
    res.status(200).send({ msg: "users seeded" });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

// Register new user
userController.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const foundUser = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (foundUser) {
      return res.status(400).send({ msg: "user exists" });
    } else {
      await prisma.User.create({
        data: {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, saltRounds),
        },
      });
      res.status(200).send({ msg: "Created new user" });
    }
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

module.exports = userController;
