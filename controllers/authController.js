const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { pool } = require("../config/db");

exports.registerUser = async (req, res) => {
    try {
      const { name, email, password, password2 } = req.body;
      let errors = [];
  
      // Validation checks
      if (!name || !email || !password || !password2) errors.push({ message: "Please enter all fields" });
      if (password !== password2) errors.push({ message: "Passwords do not match" });
      if (password.length < 8) errors.push({ message: "Password must be at least 8 characters" });
  
      // If there are errors, return immediately (NO DATABASE QUERY)
      if (errors.length > 0) {
        return res.render("register", { errors });
      }
  
      // Check if the user already exists BEFORE hashing the password
      const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (checkUser.rows.length > 0) {
        return res.render("register", { errors: [{ message: "Email already registered" }] });
      }
  
      // Now that everything is validated, hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
  
      // Redirect after successful registration
      res.redirect("/login");
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).send("Server error, please try again.");
    }
  };

exports.loginUser = async (req, res) => {
  const { email, password, "g-recaptcha-response": captchaToken } = req.body;

  if (!captchaToken) return res.render("login", { message: "❌ reCAPTCHA verification failed" });

  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

  try {
    const response = await axios.post(verifyURL);
    if (!response.data.success) return res.render("login", { message: "❌ reCAPTCHA failed" });
  } catch (err) {
    return res.render("login", { message: "❌ reCAPTCHA server error", siteKey: process.env.RECAPTCHA_SITE_KEY });
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length === 0) return res.render("login", { message: "Invalid email or password" });

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.render("login", { message: "Invalid email or password", siteKey: process.env.RECAPTCHA_SITE_KEY });

  const token = jwt.sign({ id: user.id, name: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });

  res.cookie("token", token, { httpOnly: true, secure: false, maxAge: 15 * 60 * 1000 });
  res.redirect("/dashboard");
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  req.session.destroy(() => res.redirect("/login"));
};
