
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");

  const getImageUrl = (product) => {
    const image = product?.image || product?.imageUrl;

    if (!image) return "/images/keyboard.jpg";

    if (image.startsWith("http")) return image;

    if (image.startsWith("/images/")) return image;

    return `http://localhost:5000${
      image.startsWith("/") ? image : `/${image}`
    }`;
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartItems([]);
        navigate("/login");
        return;
      }

      const response = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      setCartItems(
        Array.isArray(data) ? data : data.cart || data.items || []
      );
    } catch (error) {
      console.error(
        "Fetch cart error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message || "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    const itemId = item._id;

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/cart/update/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
    } catch (error) {
      console.error(
        "Update quantity error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update quantity"
      );
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Item removed from cart");
      await fetchCart();
    } catch (error) {
      console.error(
        "Remove item error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  const handleCheckout = async () => {
    if (checkingOut) return;

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in before checkout");
      navigate("/login");
      return;
    }

    setCheckingOut(true);

    try {
      const response = await API.post(
        "/orders",
        {
          shippingAddress: shippingAddress.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data.message || "Order placed successfully!"
      );

      setCartItems([]);
      navigate("/orders");
    } catch (error) {
      console.error(
        "Checkout error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Checkout failed. Please try again."
      );
    } finally {
      setCheckingOut(false);
    }
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const product = item.product;

    if (!product) return total;

    return (
      total +
      Number(product.price || 0) * Number(item.quantity || 1)
    );
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = item.product;

                if (!product) return null;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-5"
                  >
                    <img
                      src={getImageUrl(product)}
                      alt={product.name || "Product"}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/keyboard.jpg";
                      }}
                    />

                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-800">
                        {product.name}
                      </h2>

                      <p className="text-blue-600 font-semibold mt-2">
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </p>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item,
                              Number(item.quantity || 1) - 1
                            )
                          }
                          disabled={Number(item.quantity || 1) <= 1}
                          className="w-8 h-8 rounded border disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="font-semibold">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item,
                              Number(item.quantity || 1) + 1
                            )
                          }
                          className="w-8 h-8 rounded border"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item._id)}
                          className="ml-auto text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="font-bold text-gray-800">
                      ₹
                      {(
                        Number(product.price || 0) *
                        Number(item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between mb-5 text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="border-t pt-5">
                <label
                  htmlFor="shippingAddress"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Shipping Address
                </label>

                <textarea
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) =>
                    setShippingAddress(e.target.value)
                  }
                  placeholder="Enter your full delivery address"
                  className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut || cartItems.length === 0}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkingOut
                    ? "Placing Order..."
                    : "Proceed to Checkout"}
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
