const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.orderStatus = orderStatus;

        await order.save();

        res.json({
            message: "Order status updated",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const addProduct = async (req, res) => {
    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Product updated successfully",
            updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    getAllUsers,
    getAllOrders,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct
};