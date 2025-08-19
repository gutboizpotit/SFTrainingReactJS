import * as XLSX from "xlsx";
import { useTheme } from "../context/ThemeContext";

const ExportJobsButton = ({ jobs }) => {
  const { theme } = useTheme();

  const handleExport = () => {
    const username =
      JSON.parse(localStorage.getItem("user") || "{}")?.username || "guest";

    if (!jobs || jobs.length === 0) {
      alert("No jobs to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(jobs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");

    XLSX.writeFile(workbook, `jobs_${username}.xlsx`);
  };

  // Tùy chọn 1: Màu xanh lá
  const bgColor =
    theme === "dark"
      ? "bg-green-700 hover:bg-green-900"
      : "bg-green-700 hover:bg-green-900";

  const textColor = theme === "dark" ? "text-gray-100" : "text-white";

  return (
    <button
      onClick={handleExport}
      className={`px-6 py-2 font-semibold rounded-lg transition-colors ${bgColor} ${textColor}`}
    >
      Export Jobs
    </button>
  );
};

export default ExportJobsButton;
