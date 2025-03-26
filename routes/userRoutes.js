const express = require("express");
const router = express.Router();
const { dashboard, profile } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, dashboard);   // protect the dashboard route
router.get("/profile", authMiddleware, profile);    // protect the profile route as well

module.exports = router;
