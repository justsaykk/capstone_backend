// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const productSeed = require("./seed_data/product_seed");
const itinerarySeed = require("./seed_data/itinerary_seed");
const dayActivitiesSeed = require("./seed_data/dayactivities_seed");
const productController = express.Router();

// Generic Get Route (/api/product)
productController.get("/", async (req, res) => {
  try {
    const productList = await prisma.Products.findMany();
    res.send(productList);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// Seed Routes
productController.get("/seed/product", async (req, res) => {
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
productController.get("/seed/itinerary", async (req, res) => {
  try {
    await prisma.Itinerary.deleteMany({ where: {} });
    await prisma.Itinerary.createMany({
      data: itinerarySeed,
    });
    res.status(200).send({ msg: "Itinerary seeded" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
productController.get("/seed/dayactivities", async (req, res) => {
  try {
    await prisma.DayActivities.deleteMany({ where: {} });
    await prisma.DayActivities.createMany({
      data: dayActivitiesSeed,
    });
    res.status(200).send({ msg: "DayActivities seeded" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// Routes

module.exports = productController;