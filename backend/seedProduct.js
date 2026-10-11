const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const products = [
    {
  name: "Mechanical Gaming Keyboard",
  description:
    "RGB mechanical keyboard with blue switches, anti-ghosting keys and premium aluminum body.",
  price: 4999,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
  images: [
    "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
    "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800"
  ],
  stock: 25,
  tags: [
    "keyboard",
    "gaming",
    "rgb",
    "electronics",
    "wireless"
  ]
},
{
  name: "Wireless Gaming Mouse",
  description:
    "Ergonomic gaming mouse with adjustable DPI and RGB lighting.",
  price: 2499,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
  images: [
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800",
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800"
  ],
  stock: 30,
  tags: [
    "mouse",
    "gaming",
    "wireless",
    "electronics"
  ]
},
{
  name: "Noise Cancelling Headphones",
  description:
    "Premium over-ear wireless headphones with active noise cancellation.",
  price: 8999,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800"
  ],
  stock: 18,
  tags: [
    "headphones",
    "music",
    "wireless",
    "electronics"
  ]
},
{
  name: "Full HD Webcam",
  description:
    "1080p USB webcam with built-in microphone, perfect for online meetings and streaming.",
  price: 3299,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
  images: [
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800"
  ],
  stock: 15,
  tags: [
    "webcam",
    "camera",
    "office",
    "electronics"
  ]
},

{
  name: "Bluetooth Portable Speaker",
  description:
    "Water-resistant Bluetooth speaker with deep bass and 12-hour battery life.",
  price: 2799,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800",
  images: [
    "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
    "https://images.unsplash.com/photo-1512446816042-444d64126727?w=800",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"
  ],
  stock: 24,
  tags: [
    "speaker",
    "bluetooth",
    "music",
    "electronics"
  ]
},

{
  name: "Smart Fitness Watch",
  description:
    "Track heart rate, sleep, workouts and notifications with a vibrant AMOLED display.",
  price: 6999,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  images: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800"
  ],
  stock: 20,
  tags: [
    "watch",
    "fitness",
    "smartwatch",
    "electronics"
  ]
},

{
  name: "10000mAh Power Bank",
  description:
    "Fast-charging portable power bank with USB-C input/output and dual USB ports.",
  price: 1999,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800",
  images: [
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800",
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  ],
  stock: 35,
  tags: [
    "powerbank",
    "charger",
    "mobile",
    "electronics"
  ]
},

{
  name: "USB-C Multiport Hub",
  description:
    "7-in-1 USB-C hub featuring HDMI, USB 3.0, SD card reader and PD charging.",
  price: 2499,
  category: "Electronics",
  image:
    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800",
  images: [
    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800"
  ],
  stock: 18,
  tags: [
    "usb-c",
    "hub",
    "adapter",
    "electronics"
  ]
},
{
  name: "Waterproof Winter Parka Jacket",
  description:
    "Heavy-duty insulated jacket designed for cold weather with waterproof fabric and thermal lining.",
  price: 3499,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
  images: [
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
  ],
  stock: 20,
  tags: [
    "jacket",
    "winter",
    "fashion",
    "clothing"
  ]
},

{
  name: "Classic Blue Denim Jacket",
  description:
    "Stylish denim jacket with premium cotton fabric for everyday casual wear.",
  price: 2599,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
  images: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  ],
  stock: 18,
  tags: [
    "denim",
    "jacket",
    "casual",
    "clothing"
  ]
},

{
  name: "Premium Cotton Hoodie",
  description:
    "Soft fleece-lined hoodie with adjustable hood and front pocket.",
  price: 1999,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
  images: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
  ],
  stock: 28,
  tags: [
    "hoodie",
    "winter",
    "casual",
    "clothing"
  ]
},

{
  name: "Slim Fit Polo T-Shirt",
  description:
    "Breathable polo t-shirt made from premium cotton with a modern slim fit.",
  price: 999,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  ],
  stock: 35,
  tags: [
    "polo",
    "tshirt",
    "fashion",
    "clothing"
  ]
},

{
  name: "Regular Fit Cotton Shirt",
  description:
    "Comfortable cotton shirt suitable for office and casual occasions.",
  price: 1499,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
  images: [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  ],
  stock: 26,
  tags: [
    "shirt",
    "cotton",
    "formal",
    "clothing"
  ]
},

{
  name: "Stretch Denim Jeans",
  description:
    "Classic slim-fit stretch jeans for all-day comfort.",
  price: 1899,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
  images: [
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  ],
  stock: 30,
  tags: [
    "jeans",
    "denim",
    "casual",
    "clothing"
  ]
},

{
  name: "Comfort Joggers",
  description:
    "Soft cotton joggers perfect for workouts, travel and daily wear.",
  price: 1299,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1506629905607-5f8e6c4b0e3f?w=800",
  images: [
    "https://images.unsplash.com/photo-1506629905607-5f8e6c4b0e3f?w=800",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
  ],
  stock: 32,
  tags: [
    "joggers",
    "sports",
    "cotton",
    "clothing"
  ]
},

{
  name: "Crew Neck Sweatshirt",
  description:
    "Warm fleece sweatshirt with a modern minimalist design.",
  price: 1699,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
  images: [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  ],
  stock: 22,
  tags: [
    "sweatshirt",
    "winter",
    "casual",
    "clothing"
  ]
},
{
  name: "Running Shoes Ultra Comfort",
  description:
    "Lightweight running shoes with breathable mesh, shock absorption and superior comfort.",
  price: 2499,
  category: "Footwear",
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800"
  ],
  stock: 30,
  tags: [
    "running",
    "sports",
    "shoes",
    "footwear"
  ]
},

{
  name: "Classic White Sneakers",
  description:
    "Minimalist everyday sneakers with cushioned sole and premium finish.",
  price: 2199,
  category: "Footwear",
  image:
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
  images: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800"
  ],
  stock: 26,
  tags: [
    "sneakers",
    "casual",
    "white",
    "footwear"
  ]
},

{
  name: "Leather Formal Shoes",
  description:
    "Elegant leather formal shoes designed for office and business occasions.",
  price: 3499,
  category: "Footwear",
  image:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
  images: [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
  ],
  stock: 18,
  tags: [
    "formal",
    "leather",
    "office",
    "footwear"
  ]
},

{
  name: "Hiking Trek Boots",
  description:
    "Water-resistant trekking boots with durable grip for outdoor adventures.",
  price: 4299,
  category: "Footwear",
  image:
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
  images: [
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800"
  ],
  stock: 14,
  tags: [
    "boots",
    "hiking",
    "trekking",
    "footwear"
  ]
},

{
  name: "Comfort Walking Sandals",
  description:
    "Lightweight sandals with ergonomic foot support for daily use.",
  price: 1499,
  category: "Footwear",
  image:
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
  images: [
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800"
  ],
  stock: 24,
  tags: [
    "sandals",
    "comfort",
    "casual",
    "footwear"
  ]
},

{
  name: "Sports Training Shoes",
  description:
    "Versatile sports shoes suitable for gym workouts, running and fitness training.",
  price: 2899,
  category: "Footwear",
  image:
    "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800",
  images: [
    "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800"
  ],
  stock: 27,
  tags: [
    "sports",
    "training",
    "gym",
    "footwear"
  ]
},
{
  name: "Non-Stick Cookware Set",
  description:
    "Premium 5-piece non-stick cookware set with induction compatible base.",
  price: 3499,
  category: "Home & Kitchen",
  image:
    "https://images.unsplash.com/photo-1584990347449-ae47d65d5d73?w=800",
  images: [
    "https://images.unsplash.com/photo-1584990347449-ae47d65d5d73?w=800",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
    "https://images.unsplash.com/photo-1506368083636-6defb67639a7?w=800",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800"
  ],
  stock: 15,
  tags: ["kitchen", "cookware", "pan", "home"]
},

{
  name: "Electric Kettle",
  description:
    "1.8L stainless steel electric kettle with auto shut-off protection.",
  price: 1699,
  category: "Home & Kitchen",
  image:
    "https://images.unsplash.com/photo-1516318896980-cf78c088247c?w=800",
  images: [
    "https://images.unsplash.com/photo-1516318896980-cf78c088247c?w=800",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
  ],
  stock: 20,
  tags: ["kettle", "kitchen", "appliance"]
},

{
  name: "Memory Foam Pillow",
  description:
    "Orthopedic memory foam pillow designed for better neck support.",
  price: 1299,
  category: "Home & Kitchen",
  image:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  images: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
  ],
  stock: 30,
  tags: ["pillow", "bedroom", "home"]
},

{
  name: "Leather Wallet",
  description:
    "Premium genuine leather wallet with multiple card slots.",
  price: 999,
  category: "Accessories",
  image:
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
  images: [
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800"
  ],
  stock: 40,
  tags: ["wallet", "leather", "fashion"]
},

{
  name: "Polarized Sunglasses",
  description:
    "UV400 polarized sunglasses with lightweight metal frame.",
  price: 1499,
  category: "Accessories",
  image:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
  images: [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"
  ],
  stock: 22,
  tags: ["sunglasses", "fashion", "accessories"]
},

{
  name: "Travel Backpack",
  description:
    "Water-resistant 35L backpack with laptop compartment.",
  price: 2499,
  category: "Accessories",
  image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  images: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
  ],
  stock: 18,
  tags: ["bag", "travel", "backpack"]
},

{
  name: "Atomic Habits",
  description:
    "Best-selling self-improvement book by James Clear.",
  price: 599,
  category: "Books",
  image:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
  images: [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800"
  ],
  stock: 50,
  tags: ["book", "self-help", "reading"]
},

{
  name: "The Psychology of Money",
  description:
    "A practical guide to understanding wealth, investing and financial decisions.",
  price: 499,
  category: "Books",
  image:
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
  images: [
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800"
  ],
  stock: 45,
  tags: ["book", "finance", "money"]
}
];

const seedProducts = async () => {
  try {
    // Delete existing products
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany(products);

    console.log("✅ Products Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

mongoose.connection.once("open", () => {
  seedProducts();
});