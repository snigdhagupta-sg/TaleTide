const express = require("express"); //backend mai we can use routes and middleware, basically we can easily do backend
const cors = require("cors"); //if frontend and backend are on different ports they can communicate
const mongoose = require("mongoose"); // to cummunicate with the mongodb server
const prescriptionRoutes = require("./routes/prescriptionRoutes.js"); 

const PORT = process.env.PORT || 5000;

const { generateToken } = require("./config/jwt.js");
const { jwtMiddleware } = require("./middleware/jwtMiddleware.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const paymentRoutes = require("./routes/stripe.js");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const medicineRoutes = require("./routes/medicineRoutes.js");
const app = express();

// Middleware
app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();
app.use("/api/medicines", medicineRoutes);
app.use("/auth", authRoutes);
app.use("/api/stripe", paymentRoutes);
app.use("/users", userRoutes);
app.use('/api', prescriptionRoutes);
app.use("/uploads", express.static("uploads"));

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
