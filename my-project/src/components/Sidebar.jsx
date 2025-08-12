export default function Sidebar({ onNavigate, currentPath }) {
  return (
    <aside className="w-56 bg-gray-100 p-4">
      <nav className="flex flex-col space-y-2">
        <button
          className={`text-gray-700 font-semibold p-2 rounded hover:bg-purple-200 ${
            currentPath === "/" ? "bg-purple-300 text-white" : ""
          }`}
          onClick={() => onNavigate("/")}
        >
          Dashboard
        </button>
        <button
          className={`text-gray-700 font-semibold p-2 rounded hover:bg-purple-200 ${
            currentPath === "/add-job" ? "bg-purple-300 text-white" : ""
          }`}
          onClick={() => onNavigate("/add-job")}
        >
          Add Job
        </button>
        <button
          className="text-gray-700 font-semibold p-2 rounded hover:bg-purple-200"
          disabled
        >
          Settings
        </button>
      </nav>
    </aside>
  );
}
