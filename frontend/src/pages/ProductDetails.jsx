import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../api/axios";
import RatingSummary from "../components/RatingSummary";

function ProductDetails() {
  const { id } = useParams();

  // -----------------------------
  // State
  // -----------------------------
  const [product, setProduct] = useState(null);

  const [reviewSummary, setReviewSummary] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [editingReview, setEditingReview] = useState(null);

  const [user, setUser] = useState(null);

  // -----------------------------
  // Load Data
  // -----------------------------
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }
    fetchProduct();
    fetchReviews();
  }, [id]);

  // -----------------------------
  // Fetch Product
  // -----------------------------
  const fetchProduct = async () => {
    try {
  const { data } = await API.get(`/products/${id}`);

setProduct(data);

const images =
  data.images && data.images.length > 0
    ? data.images
    : [data.image];

setSelectedImage(images[0]);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load product");
    }
  };

  // -----------------------------
  // Fetch Reviews
  // -----------------------------
  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/reviews/${id}`);

      setReviewSummary({
        averageRating: data.averageRating,
        totalReviews: data.totalReviews,
        ratingDistribution: data.ratingDistribution,
      });

      setReviews(data.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Add To Cart
  // -----------------------------
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const { data } = await API.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message || "Added to Cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add product to cart"
      );
    }
  };

  // -----------------------------
  // Add To Wishlist
  // -----------------------------
  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const { data } = await API.post(
        "/wishlist/add",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message || "Added to Wishlist");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add to wishlist"
      );
    }
  };

  // -----------------------------
  // Submit Review
  // -----------------------------
  const submitReview = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (editingReview) {
      await API.put(
        `/reviews/${editingReview._id}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review updated successfully!");

      setEditingReview(null);

    } else {
      await API.post(
        `/reviews/${id}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review submitted successfully!");
    }

    setRating(5);
    setComment("");

    fetchReviews();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to submit review"
    );
  }
};
const handleEdit = (review) => {

  setEditingReview(review);

  setRating(review.rating);

  setComment(review.comment);

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

const handleDelete = async (reviewId) => {

  if (!window.confirm("Delete this review?")) return;

  try {

    const token = localStorage.getItem("token");

    await API.delete(`/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Review deleted successfully!");

    fetchReviews();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Unable to delete review"
    );

  }

};
  // -----------------------------
  // Loading
  // -----------------------------
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-bold">
          Loading Product...
        </h2>
      </div>
    );
  }
  const productImages =
     product.images && product.images.length > 0
        ? product.images
        : [product.image];

    return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <div className="grid md:grid-cols-2 gap-12">

          {/* Product Image Gallery */}

          <div>

            {/* Main Image */}

            <div className="overflow-hidden rounded-3xl shadow-xl bg-white">

              <img
                src={
                  selectedImage ||
                  product.image ||
                  "https://via.placeholder.com/600"
                }
                alt={product.name}
                className="
                  w-full
                  h-[550px]
                  object-cover
                  transition-all
                  duration-300
                  hover:scale-105
                  cursor-zoom-in
                "
              />

            </div>

            {/* Thumbnail Images */}

            {productImages.length > 1 && (

              <div className="flex gap-4 mt-6 flex-wrap justify-center">

                {productImages.map((img, index) => (

                  <img
                    key={index}
                    src={img}
                    alt={`Product ${index + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      w-24
                      h-24
                      rounded-xl
                      object-cover
                      cursor-pointer
                      border-4
                      transition-all
                      duration-300
                      ${
                        selectedImage === img
                          ? "border-blue-600 scale-105"
                          : "border-gray-200 hover:border-blue-400"
                      }
                    `}
                  />

                ))}

              </div>

            )}

          </div>

          {/* Product Details */}

          <div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {product.category}
            </span>

            <h1 className="text-5xl font-bold mt-5">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="flex items-center mt-5">

              <div className="flex">

                {[1, 2, 3, 4, 5].map((star) => (

                  <FaStar
                    key={star}
                    className={
                      star <= Math.round(reviewSummary?.averageRating || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />

                ))}

              </div>

              <span className="ml-3 text-gray-600">

                {reviewSummary?.averageRating || 0}

                {" "}(
                {reviewSummary?.totalReviews || 0}
                {" "}Reviews)

              </span>

            </div>

            {/* Price */}

            <h2 className="text-5xl text-blue-600 font-bold mt-8">
              ₹{product.price}
            </h2>

            {/* Description */}

            <p className="text-gray-600 leading-8 mt-8 text-lg">
              {product.description}
            </p>

            {/* Stock */}

            <div className="mt-8">

              {product.stock > 0 ? (

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  ✅ In Stock ({product.stock})
                </span>

              ) : (

                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                  ❌ Out of Stock
                </span>

              )}

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-10">

              <button
                onClick={addToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-3 text-lg font-semibold transition"
              >
                <FaShoppingCart />
                Add to Cart
              </button>

              <button
                onClick={addToWishlist}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 rounded-xl flex items-center gap-3 text-lg font-semibold transition"
              >
                <FaHeart />
                Wishlist
              </button>

            </div>

            {/* Features */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">

              <div className="bg-gray-100 rounded-xl p-5 text-center">

                <FaTruck className="mx-auto text-3xl text-blue-600 mb-3" />

                <h3 className="font-bold">
                  Free Delivery
                </h3>

              </div>

              <div className="bg-gray-100 rounded-xl p-5 text-center">

                <FaShieldAlt className="mx-auto text-3xl text-green-600 mb-3" />

                <h3 className="font-bold">
                  Secure Payment
                </h3>

              </div>

              <div className="bg-gray-100 rounded-xl p-5 text-center">

                <FaUndo className="mx-auto text-3xl text-red-500 mb-3" />

                <h3 className="font-bold">
                  7 Days Return
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Rating Summary */}

        <div className="mt-16">

          <RatingSummary
            summary={reviewSummary}
          />

        </div>
                {/* ===================== */}
        {/* Write a Review */}
        {/* ===================== */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-8">
            Write a Review
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-8 border">

            <label className="block font-semibold mb-4">
              Your Rating
            </label>

            <div className="flex gap-2 text-3xl mb-6">

              {[1, 2, 3, 4, 5].map((star) => (

                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition ${
                    star <= rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                />

              ))}

            </div>

            <label className="block font-semibold mb-3">
              Your Review
            </label>

            <textarea
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={submitReview}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
             {editingReview ? "Update Review" : "Submit Review"}
            </button>

            {editingReview && (
              <button
                onClick={() => {
                  setEditingReview(null);
                  setRating(5);
                  setComment("");
                }}
                className="ml-4 mt-6 bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
            )}

          </div>

        </div>

        {/* ===================== */}
        {/* Customer Reviews */}
        {/* ===================== */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-8">
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (

            <div className="bg-gray-50 rounded-2xl p-8 text-center">

              <p className="text-gray-500 text-lg">
                No reviews yet.
                Be the first to review this product.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {reviews.map((review) => (

                <div
                  key={review._id}
                  className="bg-white rounded-2xl shadow-md p-6 border"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="font-bold text-lg">
                        {review.user?.name || "Anonymous"}
                      </h3>

                      <div className="flex mt-2">

                        {[1, 2, 3, 4, 5].map((star) => (

                          <FaStar
                            key={star}
                            className={
                              star <= review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />

                        ))}

                      </div>

                    </div>

                    <span className="text-sm text-gray-500">

                      {review.createdAt
                        ? new Date(
                            review.createdAt
                          ).toLocaleDateString()
                        : ""}

                    </span>

                  </div>

                  <p className="mt-5 text-gray-700 leading-7">

                    {review.comment}

                  </p>
                  {user && review.user?._id === user.id && (

                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() => handleEdit(review)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(review._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;