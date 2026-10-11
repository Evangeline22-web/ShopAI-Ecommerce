const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getAllOrders,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/adminController");

// Users
router.get("/users", protect, admin, getAllUsers);

// Orders
router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id", protect, admin, updateOrderStatus);

// Products
router.post("/products", protect, admin, addProduct);
router.put("/products/:id", protect, admin, updateProduct);
router.delete("/products/:id", protect, admin, deleteProduct);

module.exports = router;