// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bookingsController = express.Router();

const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res.status(401).send({ error: "unauthorized" });
  }
};

// Routes
bookingsController.get("/", isAuth, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    // Code here
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = bookingsController;
