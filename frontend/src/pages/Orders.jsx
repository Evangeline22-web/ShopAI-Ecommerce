
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getImageUrl = (product) => {
    const image = product?.image || product?.imageUrl;

    if (!image) {
      return "/images/keyboard.jpg";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("/images/")) {
      return image;
    }

    return `http://localhost:5000${
      image.startsWith("/") ? image : `/${image}`
    }`;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(
        "Fetch orders error:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          📦 My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              No orders placed yet.
            </h3>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      Order Details
                    </h2>
                    <p className="text-sm text-gray-500 break-all">
                      Order ID: {order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Order Status</p>
                    <span className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                      {order.status || "Processing"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-500 text-sm">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-500 text-sm">
                      Ordered On
                    </p>
                    <p className="font-semibold text-gray-800">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-2">
                    Shipping Address
                  </h3>
                  <p className="text-gray-600">
                    {order.shippingAddress || "Address unavailable"}
                  </p>
                </div>

                <div className="border-t pt-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Products
                  </h3>

                  <div className="space-y-4">
                    {(order.products || []).map((item, index) => {
                      const product = item.product;

                      if (!product) {
                        return (
                          <div
                            key={item._id || index}
                            className="border rounded-lg p-4 text-gray-500"
                          >
                            Product details are unavailable.
                          </div>
                        );
                      }

                      return (
                        <div
                          key={item._id || product._id || index}
                          className="flex flex-col sm:flex-row gap-4 border rounded-xl p-4"
                        >
                          <img
                            src={getImageUrl(product)}
                            alt={product.name || "Ordered product"}
                            className="w-28 h-28 object-cover rounded-lg bg-gray-100"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/images/keyboard.jpg";
                            }}
                          />

                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-lg">
                              {product.name || "Unnamed product"}
                            </h4>

                            <p className="text-blue-600 font-semibold mt-2">
                              ₹{Number(product.price || 0).toLocaleString("en-IN")}
                            </p>

                            <p className="text-gray-600 mt-1">
                              Quantity: {item.quantity || 1}
                            </p>

                            <p className="font-semibold text-gray-800 mt-2">
                              Subtotal: ₹
                              {(
                                Number(product.price || 0) *
                                Number(item.quantity || 1)
                              ).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
