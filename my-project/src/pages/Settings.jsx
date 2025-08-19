import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    setIsToggling(true);
    setTheme(theme === "light" ? "dark" : "light");
    setTimeout(() => setIsToggling(false), 300);
  };

  const Card = ({ icon, title, desc, color }) => (
    <div
      className={`rounded-xl p-6 transition-all duration-300 border ${
        theme === "dark"
          ? "bg-gray-800/60 border-gray-700/50"
          : "bg-white/60 border-gray-200/50"
      } hover:shadow-lg hover:scale-[1.02]`}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div
          className={`p-2 rounded-lg ${
            theme === "dark" ? color.dark : color.light
          }`}
        >
          {icon}
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p
        className={`text-sm ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {desc}
      </p>
    </div>
  );

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-all duration-500 ease-in-out ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Customize your experience
          </p>
        </div>
        <div
          className={`relative overflow-hidden rounded-2xl p-8 shadow-2xl backdrop-blur-sm border transition-all duration-500 ${
            theme === "dark"
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-gray-200/50"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-purple-600 to-blue-600"
                      : "bg-gradient-to-br from-purple-500 to-blue-500"
                  }`}
                >
                  {theme === "dark" ? "🌙" : "☀️"}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Appearance</h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Choose your preferred theme
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-6 rounded-xl ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-900/20 to-blue-900/20"
                  : "bg-gradient-to-r from-purple-50/50 to-blue-50/50"
              }`}
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`font-medium transition-opacity ${
                    theme === "light" ? "opacity-100" : "opacity-60"
                  }`}
                >
                  Light
                </span>

                <div className="relative mx-6">
                  <button
                    onClick={handleToggle}
                    disabled={isToggling}
                    className={`relative w-16 h-8 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition-all ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
                        : "bg-gray-300 hover:bg-gray-400"
                    } ${isToggling ? "scale-95" : "hover:scale-105"}`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-all ${
                        theme === "dark"
                          ? "translate-x-8 shadow-purple-500/30"
                          : "translate-x-1"
                      } ${isToggling ? "scale-110" : ""}`}
                    >
                      <div className={`${isToggling ? "animate-spin" : ""}`}>
                        {theme === "dark" ? "🌙" : "☀️"}
                      </div>
                    </div>
                  </button>
                </div>

                <span
                  className={`font-medium transition-opacity ${
                    theme === "dark" ? "opacity-100" : "opacity-60"
                  }`}
                >
                  Dark
                </span>
              </div>
            </div>

            {/* Current theme */}
            <div className="mt-6 text-center">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Currently using{" "}
                <span
                  className={`font-semibold px-2 py-1 rounded-full text-xs ${
                    theme === "dark"
                      ? "bg-purple-900/30 text-purple-300"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {theme === "dark" ? "Dark" : "Light"} mode
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
