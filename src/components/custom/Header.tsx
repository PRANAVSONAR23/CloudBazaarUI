import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = { _id:123, role: "admin"};

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout=()=>(
    setIsOpen(false)
)

  return (
    <nav className="border-b bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300 transition"  onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/search" className="hover:text-gray-300 transition"  onClick={() => setIsOpen(false)}>
          Search
        </Link>
        <Link to="/cart" className="hover:text-gray-300 transition"  onClick={() => setIsOpen(false)}>
          Cart
        </Link>
      </div>

      {/* User Section */}
      {user?._id ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            User
          </button>
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg p-4 z-10"
              onBlur={() => setIsOpen(false)}
            >
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="block py-2 px-4 hover:bg-gray-600 rounded"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/orders"
                className="block py-2 px-4 hover:bg-gray-600 rounded"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Orders
              </Link>
              <button
                className="w-full text-left py-2 px-4 bg-red-600 text-white hover:bg-red-500 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Header;
