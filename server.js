// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userController = require("./controllers/userController");
const prisma = new PrismaClient();
const app = express();
const PORT = 4000;

// Routes
app.use("/user", userController);

// Listener
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
