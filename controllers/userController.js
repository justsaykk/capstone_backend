// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userController = express.Router();
const userSeeds = require("./seed_data/user_seed");

const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res.status(401).send({ error: "not authorized" });
  }
};

// Login Route (/api/user)
userController.post("/login", async (req, res) => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!foundUser) {
      res.status(401).send({ msg: "email address not found" });
      return;
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      req.session.isLoggedIn = true;
      res.status(200).send(foundUser);
    } else {
      res.status(401).send({ msg: "Wrong Password" });
    }
  } catch (error) {
    res.status(200).send({ msg: error });
  }
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

// Logout Route
userController.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).send({ msg: "unable to logout" });
      } else {
        res.send({ msg: "logout successfully" });
      }
    });
  } else {
    res.end();
  }
});


module.exports = userController;
