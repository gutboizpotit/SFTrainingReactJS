const JobCard = ({ job, onEdit, onDelete, canEdit = true, canDelete = true }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="font-bold text-lg mb-1 text-gray-700">
            {job.position}
          </h3>
          <p className="text-sm mb-3 text-gray-600">
            {job.company}
          </p>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getStatusStyles(job.status)}`}>
            {job.status}
          </span>
          <p className="text-xs text-gray-400 mb-4">
            Applied: {job.applied_date}
          </p>
          {job.notes && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {job.notes}
            </p>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-auto">
          {canEdit && (
            <button
              onClick={() => onEdit(job)}
              className="px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete(job.id)}
              className="px-3 py-2 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-600 transition-colors"
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