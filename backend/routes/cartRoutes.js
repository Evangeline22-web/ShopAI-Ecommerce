const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
} = require("../controllers/cartController");

router.post("/add", protect, addToCart);

router.get("/", protect, getCart);

router.put("/update/:id", protect, updateCart);

router.delete("/remove/:id", protect, removeFromCart);

router.delete("/clear", protect, clearCart);

module.exports = router;