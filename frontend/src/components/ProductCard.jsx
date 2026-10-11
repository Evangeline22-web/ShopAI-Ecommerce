import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

function ProductCard({ product }) {
  

  let imageSrc = "/no-image.png";

  if (product.image) {
    imageSrc = product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no-image.png";
            }}
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            {product.category}
          </span>

          <span className="flex items-center text-yellow-500">
            <FaStar className="mr-1" />
            4.8
          </span>
        </div>

        <h2 className="text-xl font-bold mb-2 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm h-12 overflow-hidden">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <h3 className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </h3>

          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">
              In Stock
            </span>
          ) : (
            <span className="text-red-500 font-semibold">
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>

          <button className="bg-pink-100 p-3 rounded-lg hover:bg-pink-200 transition">
            <FaHeart className="text-pink-600" />
          </button>

          <button className="bg-green-100 p-3 rounded-lg hover:bg-green-200 transition">
            <FaShoppingCart className="text-green-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;