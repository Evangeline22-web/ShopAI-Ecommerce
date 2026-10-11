
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
  FaBoxOpen,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAccountOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          ShopAI
        </Link>

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
            className="hover:text-pink-600 transition"
          >
            <FaHeart size={22} />
          </Link>

          <Link
            to="/cart"
            aria-label="Shopping cart"
            title="Shopping Cart"
            className="hover:text-blue-600 transition"
          >
            <FaShoppingCart size={22} />
          </Link>

          {user ? (
            <div className="relative">
              {/* Account button */}
              <button
                type="button"
                onClick={() => setAccountOpen(!accountOpen)}
                aria-expanded={accountOpen}
                aria-label="Open account menu"
                className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-blue-50 transition"
              >
                <FaUserCircle
                  size={28}
                  className="text-blue-600"
                />

                <span className="font-semibold text-gray-700">
                  {user.name || "Account"}
                </span>

                <FaChevronDown
                  size={12}
                  className={`transition-transform ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown menu */}
              {accountOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close account menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setAccountOpen(false)}
                  />

                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">
                        Signed in as
                      </p>
                      <p className="font-semibold text-gray-800 truncate">
                        {user.name || "User"}
                      </p>
                    </div>

                    <Link
                      to="/orders"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <FaBoxOpen />
                      My Orders
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <FaUser />
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
