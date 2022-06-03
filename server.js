// Dependencies
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

// Controllers
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");
const bookingsController = require("./controllers/bookingsController");

// CORS
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

// Routes
app.use("/api/user", userController);
app.use("/api/product", productController);
app.use("api/bookings", bookingsController);

// Listener
app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port", 4000);
});
