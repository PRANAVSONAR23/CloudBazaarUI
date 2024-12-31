import { auth } from "@/firebase";
import { User } from "@/types/types";
import { signOut } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface propType {
  user: User | null;
}

const Header = ({ user }: propType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className=" bg-gray-900 text-white px-6 flex justify-between items-center shadow-lg ">
      {/* Logo */}
      <div className="flex items-center gap-4 ">
        <img
          src="/logo4.svg"
          alt="Logo"
          className="h-20 w-20 object-contain overflow-hidden"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link
          to="/"
          className="hover:text-blue-400 transition font-medium"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/search"
          className="hover:text-blue-400 transition font-medium"
          onClick={() => setIsOpen(false)}
        >
          Search
        </Link>
        <Link
          to="/cart"
          className="hover:text-blue-400 transition font-medium"
          onClick={() => setIsOpen(false)}
        >
          Cart
        </Link>
        <Link
          to="/orders"
          className="hover:text-blue-400 transition font-medium"
          onClick={() => setIsOpen(false)}
        >
          Orders
        </Link>
      </div>

      {/* User Section */}
      {user?._id ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition font-medium"
          >
            {user.name || "User"}
          </button>
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-60 bg-gray-800 rounded shadow-lg p-4 z-10"
            >
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="block py-2 px-4 hover:bg-gray-700 rounded font-medium text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                className="w-full text-center py-2 px-4 bg-red-600 text-white hover:bg-red-500 rounded font-medium mt-2"
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
          className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition font-medium"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Header;
