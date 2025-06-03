const express = require("express");
const router = express.Router();
const { getAdminReport } = require("../controlers/reporterController");
const verifyTokenAdmin = require("../middleware/authMiddleware");

router.get("/report", verifyTokenAdmin, getAdminReport);

module.exports = router;
