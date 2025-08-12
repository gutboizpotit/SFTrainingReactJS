import { NavLink } from "react-router-dom";

export default function Sidebar({ onNavigate }) {
  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/add-job", label: "Add Job", icon: "➕" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-full md:w-56 bg-gray-100 p-4 h-full min-h-[calc(100vh-64px)] md:min-h-full">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full block px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-3 ${
                isActive
                  ? "bg-purple-200 text-purple-700"
                  : "text-gray-700 hover:bg-purple-100 hover:text-purple-600"
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
