// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const productSeed = require("./seed_data/product_seed");
const productController = express.Router();

// Generic Get Route
productController.get("/", (req, res) => {
  res.send({ msg: "Welcome to the product get route" });
});

// Seed Route
productController.get("/seed", async (req, res) => {
  try {
    await prisma.Products.deleteMany({ where: {} });
    await prisma.Products.createMany({
      data: productSeed,
    });
    res.status(200).send({ msg: "products seeded" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = productController;
