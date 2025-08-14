import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ onNavigate }) {
  const { theme } = useTheme();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/add-job", label: "Add Job", icon: "➕" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  const bgClass = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-700";
  const hoverBg =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-purple-100";
  const hoverText =
    theme === "dark" ? "hover:text-white" : "hover:text-purple-600";

  return (
    <aside
      className={`w-full md:w-56 duration-300 ${bgClass} p-4 h-screen flex flex-col `}
    >
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full block px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-3 ${
                isActive
                  ? theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-purple-200 text-purple-700"
                  : `${textClass} ${hoverBg} ${hoverText}`
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
