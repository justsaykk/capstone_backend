// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userController = require("./controllers/userController");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Routes
app.use("/api/user", userController);

// Listener
app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port", 4000);
});
