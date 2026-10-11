const Review = require("../models/Review");
const Product = require("../models/Product");

// Add Review
const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const existingReview = await Review.findOne({
            user: req.user.id,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this product"
            });
        }

        const review = await Review.create({
            user: req.user.id,
            product: productId,
            rating,
            comment
        });

        res.status(201).json({
            message: "Review added successfully",
            review
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get Product Reviews
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId
        })
        .populate("user", "name")
        .sort({ createdAt: -1 });

        res.json(reviews);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete Review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        await review.deleteOne();

        res.json({
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    addReview,
    getProductReviews,
    deleteReview
};