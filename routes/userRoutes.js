const express = require("express");
const router = express.Router();
const { dashboard, profile } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, dashboard);
router.get("/profile", authMiddleware, profile);

module.exports = router;
