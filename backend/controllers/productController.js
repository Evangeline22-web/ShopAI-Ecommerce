const Product = require("../models/Product");

// Get all products
// Get all products (with search)
const getProducts = async (req, res) => {
    try {
        console.log("Query:", req.query);
        const keyword = req.query.keyword;

        let query = {};

        if (keyword) {
            query = {
                $or: [
                    {
                        name: {
                            $regex: keyword,
                            $options: "i"
                        }
                    },
                    {
                        category: {
                            $regex: keyword,
                            $options: "i"
                        }
                    },
                    {
                        description: {
                            $regex: keyword,
                            $options: "i"
                        }
                    }
                ]
            };
        }

        const products = await Product.find(query);

        res.json(products);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get one product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add product
const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};