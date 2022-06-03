// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const productSeed = require("./seed_data/product_seed");
const itinerarySeed = require("./seed_data/itinerary_seed");
const dayActivitiesSeed = require("./seed_data/dayactivities_seed");
const productController = express.Router();

const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res.status(401).send({ error: "not authorized" });
  }
};

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

// Generic Get Route (/api/product)
productController.get("/", async (req, res) => {
  try {
    const productList = await prisma.Products.findMany();
    res.status(200).send(productList);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// Routes
productController.post("/details", async (req, res) => {
  try {
    const query = parseInt(req.body.productId);
    const link = await prisma.Itinerary.findFirst({
      where: {
        productId: query,
      },
    });
    const details = await prisma.DayActivities.findFirst({
      where: {
        itineraryId: link.id,
      },
    });
    res.status(200).send(details);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

productController.post("/addtocart", async (req, res) => {
  try {
    const query = parseInt(req.body.productId);
    const queryResult = await prisma.Products.findUnique({
      where: {
        id: query,
      },
      select: {
        pName: true,
        price: true,
      },
    });
    res.status(200).send(queryResult);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

productController.post("/purchase", isAuth, async (req, res) => {
  try {
    const { productId, trekDate } = req.body;
    const currentUser = req.session.currentUser;
    await prisma.bookings.create({
      productId: productId,
      email: currentUser.email,
      trekDate: trekDate,
    });
    res.status(200).send({ msg: "Trip booked" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = productController;
