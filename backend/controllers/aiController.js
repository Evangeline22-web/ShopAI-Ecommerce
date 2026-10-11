const Product = require("../models/Product");
const ai = require("../utils/gemini");

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        // Get only products that are currently in stock
        const products = await Product.find({
            stock: { $gt: 0 }
        });

        if (products.length === 0) {
            return res.json({
                success: true,
                reply: "Sorry, there are currently no products available."
            });
        }

        // Create catalog for Gemini
        const productList = products
            .map(
                (p) =>
                    `Name: ${p.name}\nPrice: ₹${p.price}\nCategory: ${p.category}\nStock: ${p.stock}\nDescription: ${p.description}`
            )
            .join("\n\n");

        const prompt = `
You are an AI shopping assistant.

IMPORTANT:
You MUST recommend products ONLY from the catalog below.

AVAILABLE PRODUCT CATALOG:
${productList}

CUSTOMER:
${message}

RULES:
1. Never invent a product.
2. Never create a product name that is not in the catalog.
3. Use the EXACT product name from the catalog.
4. If there is no suitable product, say that it is currently unavailable.
5. Recommend at most 3 products.
6. Keep the response short.
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt
        });

        const aiReply = response.text || "";

        // Validate that recommendations actually exist in MongoDB
        const validProducts = products.filter((product) =>
            aiReply.toLowerCase().includes(product.name.toLowerCase())
        );

        // If Gemini invented products, remove them completely
        if (validProducts.length === 0) {
            return res.json({
                success: true,
                reply: "Sorry, I couldn't find a suitable product in our current catalog."
            });
        }

        // Return only validated products
        const productDetails = validProducts.slice(0, 3).map((product) => ({
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock
        }));

        res.json({
            success: true,
            reply: aiReply,
            products: productDetails
        });

    } catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            success: false,
            message: "AI request failed",
            error: error.message
        });
    }
};

module.exports = { chatWithAI };