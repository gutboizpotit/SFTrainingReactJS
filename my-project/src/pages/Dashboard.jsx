import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { deleteJob } from "../api/JobAPI";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Dashboard = ({ jobs, setJobs, setEditingJob, confirm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <main className="flex-1 p-4 md:p-8 bg-white min-h-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        My Jobs
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 md:flex-none md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          {user?.role === "USER" ? (
            <option value="Pending">Pending</option>
          ) : user?.role === "ADMIN" ? (
            <>
              <option value="Approve">Approve</option>
              <option value="Denied">Denied</option>
            </>
          ) : (
            <>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </>
          )}
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
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-500 mb-6">
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
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
