import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NotFound = () => {
  const { theme } = useTheme();

  const containerBg = theme === "dark" ? "bg-slate-900" : "bg-slate-50";
  const cardBg = theme === "dark" ? "bg-slate-800" : "bg-white";
  const textPrimary = theme === "dark" ? "text-slate-100" : "text-slate-900";
  const textSecondary = theme === "dark" ? "text-slate-400" : "text-slate-600";
  const buttonStyles = 
    theme === "dark"
      ? "bg-purple-600 hover:bg-purple-700 text-white"
      : "bg-purple-600 hover:bg-purple-700 text-white";

  return (
    <div className={`min-h-screen ${containerBg} flex items-center justify-center px-4`}>
      <div className={`max-w-md w-full ${cardBg} rounded-2xl shadow-xl p-8 text-center`}>
        {/* 404 Icon */}
        <div className="mb-6">
          <div className={`text-8xl ${textSecondary} mb-4`}>🔍</div>
          <h1 className={`text-6xl font-bold ${textPrimary} mb-2`}>404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className={`text-2xl font-semibold ${textPrimary} mb-3`}>
            Page Not Found
          </h2>
          <p className={`${textSecondary} leading-relaxed`}>
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/"
            className={`w-full inline-block px-6 py-3 ${buttonStyles} rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg`}
          >
            🏠 Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className={`w-full px-6 py-3 ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-slate-200" : "bg-slate-200 hover:bg-slate-300 text-slate-700"} rounded-lg font-medium transition-all duration-200`}
          >
            ← Go Back
          </button>
        </div>

        {/* Additional Info */}
        <div className={`mt-8 pt-6 border-t ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
          <p className={`text-sm ${textSecondary}`}>
            If you think this is a mistake, please{" "}
            <Link 
              to="/"
              className={`${theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"} underline transition-colors duration-200`}
            >
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
