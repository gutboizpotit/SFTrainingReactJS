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
  const headerBg =
    theme === "dark"
      ? "bg-slate-900 text-slate-100 border-b border-slate-700"
      : "bg-white text-slate-900 shadow-sm border-b border-slate-200";

  const hoverBg =
    theme === "dark"
      ? "hover:bg-slate-800 hover:text-purple-300 transition-all duration-200"
      : "hover:bg-slate-50 hover:text-purple-600 transition-all duration-200";

  const borderColor =
    theme === "dark" ? "border-slate-600" : "border-slate-300";

  const logoBg =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent"
      : "bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent";

  // Mobile menu backdrop
  const backdropColor =
    theme === "dark"
      ? "bg-slate-900/80 backdrop-blur-sm"
      : "bg-slate-900/20 backdrop-blur-sm";

  const mobileMenuBg =
    theme === "dark"
      ? "bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl"
      : "bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl";

  return (
    <header className={`duration-300 ${headerBg} px-4 md:px-8 py-4 relative`}>
      <div className="flex justify-between items-center">
        {/* Logo with gradient */}
        <div className={`font-bold text-xl md:text-2xl ${logoBg}`}>
          JobTracker
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`font-medium px-3 py-2 rounded-lg ${hoverBg}`}
          >
            Home
          </Link>
          <Link
            to="/#"
            className={`font-medium px-3 py-2 rounded-lg ${hoverBg}`}
          >
            About
          </Link>
          <Link
            to="/profile"
            className={`font-medium px-3 py-2 rounded-lg ${hoverBg}`}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className={`font-medium px-3 py-2 rounded-lg ${hoverBg}`}
          >
            Log Out
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden z-50 relative p-2 rounded-lg ${hoverBg}`}
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6 transition-transform duration-200"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-30 ${backdropColor}`}
            onClick={toggleMobileMenu}
          />

          {/* Menu Content */}
          <div
            className={`absolute top-full left-4 right-4 mt-2 rounded-xl z-40 ${mobileMenuBg} overflow-hidden`}
          >
            <nav className="flex flex-col py-2">
              <Link
                to="/"
                className={`px-6 py-4 font-medium border-b ${borderColor} ${hoverBg} flex items-center space-x-3`}
                onClick={toggleMobileMenu}
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <Link
                to="/"
                className={`px-6 py-4 font-medium border-b ${borderColor} ${hoverBg} flex items-center space-x-3`}
                onClick={toggleMobileMenu}
              >
                <span>ℹ️</span>
                <span>About</span>
              </Link>
              <Link
                to="/profile"
                className={`px-6 py-4 font-medium border-b ${borderColor} ${hoverBg} flex items-center space-x-3`}
                onClick={toggleMobileMenu}
              >
                <span>👤</span>
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
                className={`px-6 py-4 font-medium text-left ${hoverBg} flex items-center space-x-3 text-red-500 hover:text-red-400`}
              >
                <span>🚪</span>
                <span>Log Out</span>
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
