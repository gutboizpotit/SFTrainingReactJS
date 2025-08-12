export default function JobCard({ job, onDelete }) {
  const statusStyle = {
    Applied: "bg-green-100 text-green-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col justify-between bg-white">
      <div>
        <div className="text-gray-600 font-semibold text-lg mb-1">
          {job.position}
        </div>
        <div className="text-gray-500 mb-2 text-sm">{job.company}</div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            statusStyle[job.status] || "bg-gray-100 text-gray-700"
          }`}
          style={{ width: "fit-content" }}
        >
          {job.status}
        </span>
        <div className="text-gray-400 text-xs mt-2">
          Applied: {job.appliedDate}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-600 transition">
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
