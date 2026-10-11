const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check if product already exists in cart
    const existingCartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      return res.json({
        message: "Cart updated successfully",
        cart: existingCartItem,
      });
    }

    // Create new cart item
    const cart = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity,
    });

    res.status(201).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User's Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Cart Quantity
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (cart.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    cart.quantity = quantity;

    await cart.save();

    res.json({
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (cart.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await cart.deleteOne();

    res.json({
      message: "Item removed from cart",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Clear User Cart
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user.id,
    });

    res.json({
      message: "Cart cleared successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
};