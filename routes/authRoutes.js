const express = require("express");
const router = express.Router();
require("dotenv").config();

const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

router.get("/register", (req, res) => res.render("register", { errors: [] }));

router.get("/login", (req, res) => {
    const siteKey = process.env.RECAPTCHA_SITE_KEY; 

    if (!siteKey) {
        console.error("RECAPTCHA_SITE_KEY is missing in .env file!");
    }
    
    res.render("login", { 
      message: null, 
      siteKey: siteKey
    });
});

router.get("/logout", logoutUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
