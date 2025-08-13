import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const { logout } = useAuth ? useAuth() : { logout: () => {} };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  return (
    <header className="bg-indigo-600 text-white px-4 md:px-8 py-4 relative">
      <div className="flex justify-between items-center">
        <div className="logo font-bold text-xl md:text-2xl">JobTracker</div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline font-medium">
            Home
          </Link>
          <Link to="/about" className="hover:underline font-medium">
            About
          </Link>
          <Link to="/profile" className="hover:underline font-medium">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="hover:underline font-medium"
          >
            Log Out
          </button>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden z-50 relative" onClick={toggleMobileMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleMobileMenu}
          />
          {/* Menu */}
          <div className="absolute top-full left-0 right-0 bg-indigo-600 shadow-lg z-40 md:hidden">
            <nav className="flex flex-col py-2">
              <Link
                to="/"
                className="px-4 py-3 hover:bg-indigo-700 font-medium border-b border-indigo-500"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-4 py-3 hover:bg-indigo-700 font-medium border-b border-indigo-500"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                to="/profile"
                className="px-4 py-3 hover:bg-indigo-700 font-medium"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
                className="px-4 py-3 hover:bg-indigo-700 font-medium text-left"
              >
                Log Out
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
