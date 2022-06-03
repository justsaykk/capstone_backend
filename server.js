// Dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");


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
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
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
