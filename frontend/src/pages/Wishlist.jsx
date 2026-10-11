import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaHeartBroken } from "react-icons/fa";
import API from "../api/axios";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistItems(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load wishlist");
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/wishlist/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Removed from wishlist");

      fetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          ❤️ My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-semibold">
              Your wishlist is empty.
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={
                    item.product.imageUrl ||
                    "https://via.placeholder.com/300"
                  }
                  alt={item.product.name}
                  className="w-full h-60 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-blue-600 text-xl font-bold mt-2">
                    ₹{item.product.price}
                  </p>

                  <p className="text-gray-500 mt-3 line-clamp-2">
                    {item.product.description}
                  </p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition flex justify-center items-center gap-2"
                  >
                    <FaHeartBroken />
                    Remove from Wishlist
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;