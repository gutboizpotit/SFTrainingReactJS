import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Header = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const { logout } = useAuth ? useAuth() : { logout: () => {} };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    if (onMobileMenuToggle) onMobileMenuToggle(newState);
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  // Dynamic classes based on theme
  const headerBg =
    theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-indigo-600 text-white";
  const hoverBg =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-indigo-700";
  const borderColor =
    theme === "dark" ? "border-gray-600" : "border-indigo-500";

  return (
    <header className={`duration-300 ${headerBg} px-4 md:px-8 py-4 relative`}>
      <div className="flex justify-between items-center">
        <div className="logo font-bold text-xl md:text-2xl">JobTracker</div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className={`font-medium ${hoverBg}`}>
            Home
          </Link>
          <Link to="/about" className={`font-medium ${hoverBg}`}>
            About
          </Link>
          <Link to="/profile" className={`font-medium ${hoverBg}`}>
            Profile
          </Link>
          <button onClick={handleLogout} className={`font-medium ${hoverBg}`}>
            Log Out
          </button>
        </nav>

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

      {mobileMenuOpen && (
        <>
          <div
            className={`fixed inset-0 z-30 ${
              theme === "dark"
                ? "bg-black bg-opacity-70"
                : "bg-black bg-opacity-50"
            }`}
            onClick={toggleMobileMenu}
          />
          <div
            className={`absolute top-full left-0 right-0 shadow-lg z-40 ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200"
                : "bg-indigo-600 text-white"
            }`}
          >
            <nav className="flex flex-col py-2">
              <Link
                to="/"
                className={`px-4 py-3 font-medium border-b ${borderColor} ${hoverBg}`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-4 py-3 font-medium border-b ${borderColor} ${hoverBg}`}
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                to="/profile"
                className={`px-4 py-3 font-medium ${hoverBg}`}
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
                className={`px-4 py-3 font-medium text-left ${hoverBg}`}
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
