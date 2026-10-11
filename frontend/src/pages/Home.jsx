import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
      const res = await API.get(`/products?keyword=${keyword}`);

      setAllProducts(res.data);
      setProducts(res.data);
    } catch (error) {
        console.log("ERROR:", error);
        console.log("Response:", error.response);
        console.log("Message:", error.message);
      }
  };

  useEffect(() => {
    let filtered = [...allProducts];

    if (category !== "All") {
      filtered = filtered.filter(
        (p) => p.category === category
      );
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      filtered.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    setProducts(filtered);

  }, [category, sort, allProducts]);

  const keyword =
    new URLSearchParams(location.search).get("search");

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}

      {!keyword && (
        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">

            <div>

              <h1 className="text-5xl font-bold">
                AI Powered Shopping Experience
              </h1>

              <p className="mt-6 text-lg text-blue-100">
                Discover premium electronics,
                fashion and accessories.
              </p>

              <div className="mt-8 flex gap-4">

                <Link
                  to="/"
                  className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold"
                >
                  Shop Now
                </Link>

                <button className="border border-white px-6 py-3 rounded-xl">
                  Ask AI
                </button>

              </div>

            </div>

            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
              alt=""
              className="rounded-3xl shadow-xl"
            />

          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {keyword ? (
          <h2 className="text-4xl font-bold mb-8">
            Search Results for "{keyword}"
          </h2>
        ) : (
          <h2 className="text-4xl font-bold mb-8">
            Featured Products
          </h2>
        )}

        {/* Filters */}

        <div className="flex flex-wrap gap-4 mb-10">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Footwear</option>
            <option>Accessories</option>
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Sort By</option>
            <option value="low">
              Price: Low → High
            </option>
            <option value="high">
              Price: High → Low
            </option>
            <option value="name">
              Name: A → Z
            </option>
          </select>

          <button
            onClick={() => {
              setCategory("All");
              setSort("");
            }}
            className="bg-red-500 text-white px-5 rounded-lg"
          >
            Clear Filters
          </button>

        </div>

        {/* Products */}

        {products.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-3xl text-gray-500">
              No products found
            </h2>

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

      {!keyword && (
        <section className="bg-white mt-20">

          <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8 text-center">

            <div>
              <FaTruck className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold">
                Free Delivery
              </h3>
            </div>

            <div>
              <FaShieldAlt className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold">
                Secure Payments
              </h3>
            </div>

            <div>
              <FaRobot className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold">
                AI Shopping Assistant
              </h3>
            </div>

            <div>
              <FaTags className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="font-bold">
                Best Deals
              </h3>
            </div>

          </div>

        </section>
      )}

    </div>
  );
}

export default Home;