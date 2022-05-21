// Dependencies
const bcrypt = require("bcrypt");
const express = require("express");
const user = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const saltRounds = 10;
const userController = express.Router();

// Register new user
user.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    // Finding if email is inside database
    const foundUser = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
    // Create user
    if (!foundUser) {
      await prisma.User.create({
        data: {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, saltRounds),
        },
      });
    }
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

module.exports = userController;
