import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      const filtered = jobs.filter((job) => job.id !== id);
      setJobs(filtered);
      localStorage.setItem("jobs", JSON.stringify(filtered));
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "" ||
      job.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-grow p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">My Jobs</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 text-base"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
        <button
          onClick={() => navigate("/add-job")}
          className="bg-purple-700 text-white rounded-lg px-5 py-2 font-semibold hover:bg-purple-800 transition-colors"
        >
          Add Job
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">Chưa có công việc nào được thêm.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>
  );
}
