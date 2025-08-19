import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ onNavigate }) {
  const { theme } = useTheme();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/add-job", label: "Add Job", icon: "➕" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];
  const sidebarBg =
    theme === "dark"
      ? "bg-slate-900/95 border-r border-slate-700"
      : "bg-white/95 border-r border-slate-200";

  const textClass = theme === "dark" ? "text-slate-300" : "text-slate-600";

  const hoverBg =
    theme === "dark"
      ? "hover:bg-slate-800 hover:text-purple-300"
      : "hover:bg-purple-50 hover:text-purple-600";

  const activeBg =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/20"
      : "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border border-purple-200";

  const logoGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
      : "bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent";

  return (
    <aside
      className={`w-full md:w-64 duration-300 ${sidebarBg} backdrop-blur-sm p-6 h-screen flex flex-col shadow-xl`}
    >
      {/* Sidebar Header */}
      <div className="mb-8">
        <div className={`font-bold text-xl ${logoGradient} mb-2`}>
          JobTracker
        </div>
        <div
          className={`text-sm ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Manage your career
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group relative w-full block px-4 py-3.5 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3 ${
                isActive ? activeBg : `${textClass} ${hoverBg}`
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-violet-500 rounded-r-full"></div>
                )}

                {/* Icon with hover effect */}
                <span
                  className={`text-lg transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span className="flex-1">{item.label}</span>

                {/* Subtle arrow for active item */}
                {isActive && (
                  <svg
                    className="w-4 h-4 opacity-60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
