// Dependencies
const bcrypt = require("bcrypt");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const saltRounds = 10;
const userController = express.Router();

// Generic Get Route
userController.get("/", (req, res) => {
  res.send({ msg: "Welcome to the user get route" });
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
      const newUser = await prisma.User.create({
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
