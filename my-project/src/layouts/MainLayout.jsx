import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm chuyển route truyền xuống Sidebar
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar onNavigate={handleNavigate} currentPath={location.pathname} />
        <main className="flex-grow bg-white p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
