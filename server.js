require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,   // 1 minute window time for login attempts , if user exceeds the limit, they will be blocked for 1 minute
  max: 5, // Max 5 login attempts
  handler: (req, res) => {
    return res.status(429).render("login", {
      message: "Too many login attempts. Please try again after 1 minutes.",
      siteKey: process.env.RECAPTCHA_SITE_KEY
    });
  }
});

app.use("/login", loginLimiter);

app.use("/", authRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => res.render("index"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
