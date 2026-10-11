const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create Order
const createOrder = async (req, res) => {
    try {

        const { shippingAddress } = req.body;

        // Get user's cart
        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            });
        }

        let totalAmount = 0;

        const products = cartItems.map(item => {

            totalAmount += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity
            };

        });

        const order = await Order.create({
            user: req.user.id,
            products,
            totalAmount,
            shippingAddress
        });

        // Clear cart after placing order
        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Logged-in User Orders
const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders
};