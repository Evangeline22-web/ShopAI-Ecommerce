const express = require("express");
const router = express.Router();

const { chatWithAI } = require("../controllers/aiController");

router.post("/recommend", chatWithAI);

module.exports = router;