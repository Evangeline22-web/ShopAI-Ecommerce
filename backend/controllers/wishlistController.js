const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add Product to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check if product already exists in wishlist
    const existingItem = await Wishlist.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingItem) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    // Create wishlist item
    const wishlist = await Wishlist.create({
      user: req.user.id,
      product: productId,
    });

    res.status(201).json({
      message: "Product added to wishlist",
      wishlist,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.json(wishlist);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Product from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    if (wishlist.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await wishlist.deleteOne();

    res.json({
      message: "Product removed from wishlist",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};