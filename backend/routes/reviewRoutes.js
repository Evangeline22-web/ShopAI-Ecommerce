const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addReview,
    getProductReviews,
    deleteReview
} = require("../controllers/reviewController");


router.post("/add", protect, addReview);

router.get("/:productId", getProductReviews);

router.delete("/:id", protect, deleteReview);


module.exports = router;