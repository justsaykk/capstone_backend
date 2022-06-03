// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bookingsController = express.Router();

// Routes
bookingsController.get("/", async (req, res) => {
    try {
      
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = bookingsController;
