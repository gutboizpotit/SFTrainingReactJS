import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { deleteJob } from "../api/JobAPI";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Dashboard = ({ jobs, setJobs, setEditingJob, confirm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleStorage = () =>
      setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "" ||
        job.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  // Check permissions for each job
  const canEditJob = (job) => {
    if (user?.role === "ADMIN") return true;
    if (user?.role === "USER") {
      // User can only edit if they own the job AND status is Pending
      return job.user === user.username && job.status === "Pending";
    }
    return false;
  };

  const canDeleteJob = (job) => {
    if (user?.role === "ADMIN") return true;
    if (user?.role === "USER") return job.user === user.username;
    return false;
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    navigate("/add-job");
  };

  const handleDelete = async (jobId) => {
    const confirmed = await confirm({
      title: "Delete Job",
      message:
        "Are you sure you want to delete this job? This action cannot be undone.",
      type: "danger",
    });

    if (confirmed) {
      try {
        await deleteJob(jobId);
        setJobs(jobs.filter((job) => job.id !== jobId));
        toast.success("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job. Please try again.");
      }
    }
  };

  const handleAddJob = () => {
    setEditingJob(null);
    navigate("/add-job");
  };

  return (
    <main
      className={`flex-1 p-4 md:p-8 min-h-full transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-2xl md:text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        My Jobs
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
          }`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`flex-1 md:flex-none md:w-48 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-100"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={handleAddJob}
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add Job
        </button>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No jobs found
          </h3>
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {jobs.length === 0
              ? "Start by adding your first job application!"
              : "Try adjusting your search or filter criteria."}
          </p>
          {jobs.length === 0 && (
            <button
              onClick={handleAddJob}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Your First Job
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canEdit={canEditJob(job)}
              canDelete={canDeleteJob(job)}
              theme={theme}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
