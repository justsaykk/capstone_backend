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

// Routes (/api/bookings)

// Reading bookings
bookingsController.get("/", isAuth, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        email: currentUser.email,
      },
      include: {
        product: {
          select: {
            pName: true,
          },
        },
      },
    });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// Update Route
bookingsController.put("/update", isAuth, async (req, res) => {
  const id = parseInt(req.body.id);
  const data = req.body.trekDate;
  try {
    await prisma.bookings.update({
      where: {
        id: id,
      },
      data: {
        trekDate: data,
      },
    });
    res.status(200).send({ msg: "updated successfully" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// Delete Route
bookingsController.delete("/delete", isAuth, async (req, res) => {
  const id = parseInt(req.body.id);

  try {
    await prisma.bookings.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send({ msg: "Booking deleted" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = bookingsController;
