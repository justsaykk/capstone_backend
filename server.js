// Dependencies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const userController = require("./controllers/userController");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Routes
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:2000",
      "http://localhost:4000",
      "http://capstone-frontend-nu.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use("/api/user", userController);

// Listener
app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port", 4000);
});
