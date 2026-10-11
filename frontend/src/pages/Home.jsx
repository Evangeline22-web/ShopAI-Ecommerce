
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaTruck,
  FaShieldAlt,
  FaRobot,
  FaTags,
} from "react-icons/fa";

import API from "../api/axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";

    fetchProducts(keyword);
  }, [location.search]);

  const fetchProducts = async (keyword = "") => {
    try {
      const res = await API.get(
        `/products?keyword=${encodeURIComponent(keyword)}`
      );

      setAllProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setAllProducts([]);
    }
  };

  useEffect(() => {
    let filtered = [...allProducts];

    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      filtered.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    setProducts(filtered);
  }, [category, sort, allProducts]);

  const keyword =
    new URLSearchParams(location.search).get("search") || "";

  const openAIChat = () => {
    window.dispatchEvent(new Event("shopai:open-chat"));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}

      {!keyword && (
        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-blue-200 font-semibold mb-4">
                WELCOME TO SHOPAI
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                AI Powered Shopping Experience
              </h1>

              <p className="mt-6 text-lg text-blue-100">
                Discover premium electronics, fashion and
                accessories with a smarter shopping experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
                >
                  Shop Now
                </a>

                <button
                  type="button"
                  onClick={openAIChat}
                  className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
                >
                  Ask AI
                </button>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
              alt="Shopping products and accessories"
              className="w-full rounded-3xl shadow-xl"
            />
          </div>
        </section>
      )}

      {/* Products Section */}

      <div
        id="products"
        className="max-w-7xl mx-auto px-6 py-10 scroll-mt-6"
      >
        {keyword ? (
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Search Results for "{keyword}"
          </h2>
        ) : (
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Featured Products
          </h2>
        )}

        {/* Filters */}

        <div className="flex flex-wrap gap-4 mb-10">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            aria-label="Sort products"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setSort("");
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Product Cards */}

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <h2 className="text-2xl md:text-3xl text-gray-500 font-semibold">
              No products found
            </h2>

            <p className="text-gray-400 mt-3">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}

      {!keyword && (
        <section className="bg-white mt-20">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <FaTruck className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Free Delivery
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Convenient shopping at your doorstep.
              </p>
            </div>

            <div>
              <FaShieldAlt className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Secure Payments
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Shop with confidence.
              </p>
            </div>

            <div>
              <FaRobot className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                AI Shopping Assistant
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Get help finding the right products.
              </p>
            </div>

            <div>
              <FaTags className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Best Deals
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Explore products for your needs.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
