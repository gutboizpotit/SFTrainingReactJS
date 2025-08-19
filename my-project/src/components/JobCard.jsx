const JobCard = ({
  job,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
  theme, // remove default, get from localStorage if not provided
}) => {
  // Get theme from localStorage if not passed as prop
  const currentTheme = theme || localStorage.getItem("theme") || "light";

  const getStatusStyles = (status) => {
    const base = currentTheme === "dark" ? "text-gray-200" : "text-gray-800";
    switch (status.toLowerCase()) {
      case "accepted":
        return `${
          currentTheme === "dark" ? "bg-green-700" : "bg-green-100"
        } ${base}`;
      case "pending":
        return `${
          currentTheme === "dark" ? "bg-blue-700" : "bg-blue-100"
        } ${base}`;
      case "rejected":
        return `${
          currentTheme === "dark" ? "bg-red-700" : "bg-red-100"
        } ${base}`;
      default:
        return `${
          currentTheme === "dark" ? "bg-gray-700" : "bg-gray-100"
        } ${base}`;
    }
  };

  const cardBg =
    currentTheme === "dark"
      ? "bg-gray-800 text-gray-200 border-gray-600"
      : "bg-white text-gray-700 border-gray-200";
  const hoverShadow =
    currentTheme === "dark" ? "hover:shadow-lg" : "hover:shadow-md";

  return (
    <div
      className={`border ${cardBg} rounded-lg p-4 shadow-sm ${hoverShadow} transition-shadow duration-200`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className={`font-bold text-lg mb-1`}>{job.position}</h3>
          <p className="text-sm mb-3">{job.company}</p>

          {/* Personal Info */}
          <div className="space-y-2 mb-3">
            {job.name && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm">{job.name}</span>
              </div>
            )}
            {job.phone_number && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm">{job.phone_number}</span>
              </div>
            )}
            {job.email && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">{job.email}</span>
              </div>
            )}
          </div>

          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getStatusStyles(
              job.status
            )}`}
          >
            {job.status}
          </span>
          <p
            className={`text-xs mb-4 ${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-400"
            }`}
          >
            Applied: {job.applied_date}
          </p>
          {job.notes && (
            <p className={`text-sm mb-4 line-clamp-2`}>{job.notes}</p>
          )}
          {job.user && (
            <p
              className={`text-sm ${
                currentTheme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Applied by: {job.user}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-auto">
          {canEdit && (
            <button
              className={`px-3 py-2 text-sm font-semibold rounded transition-colors ${
                currentTheme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={() => onEdit(job)}
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              className={`px-3 py-2 text-sm font-semibold rounded transition-colors ${
                currentTheme === "dark"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              onClick={() => onDelete(job.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
