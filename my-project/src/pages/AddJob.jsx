import { useState, useEffect } from 'react';

const AddJob = ({ jobs, setJobs, setActiveTab, editingJob, setEditingJob }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Load editing job data
  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        position: editingJob.position,
        status: editingJob.status,
        notes: editingJob.notes || ''
      });
    } else {
      setFormData({
        company: '',
        position: '',
        status: 'Applied',
        notes: ''
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const jobData = {
      ...formData,
      id: editingJob ? editingJob.id : Date.now(),
      appliedDate: editingJob ? editingJob.appliedDate : new Date().toISOString().split('T')[0]
    };

    if (editingJob) {
      // Update existing job
      setJobs(jobs.map(job => job.id === editingJob.id ? jobData : job));
      alert('✅ Job Updated Successfully!');
    } else {
      // Add new job
      setJobs([...jobs, jobData]);
      alert('✅ Job Added Successfully!');
    }

    // Reset form and go back to dashboard
    setFormData({
      company: '',
      position: '',
      status: 'Applied',
      notes: ''
    });
    setEditingJob(null);
    setActiveTab('dashboard');
  };

  const handleCancel = () => {
    setFormData({
      company: '',
      position: '',
      status: 'Applied',
      notes: ''
    });
    setEditingJob(null);
    setActiveTab('dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            {editingJob ? 'Edit Job' : 'Add New Job'}
          </h1>
          <p className="text-center text-gray-600">
            {editingJob ? 'Update your job application details' : 'Track your job applications'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Position Field */}
          <div>
            <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
              Position *
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.position ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Notes Field */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="e.g. Interview scheduled next Monday..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {editingJob ? 'Update Job' : 'Submit Job'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;