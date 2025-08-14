import { useTheme } from "../context/ThemeContext";
const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Settings</h1>

      <div className="max-w-2xl mx-auto">
        <div
          className={`rounded-lg p-6 text-center border transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-gray-50 border-gray-200 text-gray-700"
          }`}
        >
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-lg font-semibold mb-2">Theme Settings</h3>

          <div className="mb-4">
            <label className="mr-2 font-medium">Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={`border rounded px-2 py-1 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <p>
            Current theme: <span className="font-semibold">{theme}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
