// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userController = require("./controllers/userController");
const prisma = new PrismaClient();
const app = express();

// Routes
app.use("/user", userController);

// Listener
app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port", 4000);
});
