import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob, updateJob } from "../api/JobAPI";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AddJob = ({ jobs, setJobs, editingJob, setEditingJob, confirm }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    company: "",
    position: "",
    status: user?.role === "USER" ? "Pending" : "Accepted",
    notes: "",
    user: user?.username || "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const handleStorage = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  useEffect(() => {
    if (editingJob) {
      setFormData({
        name: editingJob.name || "",
        phone_number: editingJob.phone_number || "",
        email: editingJob.email || "",
        company: editingJob.company,
        position: editingJob.position,
        status: editingJob.status,
        notes: editingJob.notes || "",
        user: editingJob.user,
      });
    } else {
      setFormData({
        name: "",
        phone_number: "",
        email: "",
        company: "",
        position: "",
        status: user?.role === "USER" ? "Pending" : "Accepted",
        notes: "",
        user: user?.username || "",
      });
    }
  }, [editingJob, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone_number?.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(formData.phone_number.trim())) {
        newErrors.phone = "Phone number must be 10 digits starting with 0";
      }
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email =
          "Email must have at least 3 characters before @ (e.g., abc@gmail.com)";
      }
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canEditJob = () => {
    if (!editingJob) return true; // Can always add new job

    if (user?.role === "ADMIN") return true; // Admin can edit any job

    // User can only edit if status is Pending
    return editingJob.status === "Pending";
  };

  // Check if fields should be editable
  const canEditField = (fieldName) => {
    if (!editingJob) return true; // Can edit all fields when adding new job

    if (user?.role === "ADMIN") {
      // Admin editing user's job can only edit status
      if (editingJob.user !== user?.username) {
        return fieldName === "status";
      }
      // Admin editing own job can edit all fields
      return true;
    }

    // User can edit their own job only if status is Pending
    return editingJob.status === "Pending";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canEditJob()) {
      toast.error(
        "You cannot edit this job because it has been Accepted or rejected."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (editingJob) {
      const confirmed = await confirm({
        title: "Update Job",
        message: "Are you sure you want to update this job application?",
        type: "warning",
      });

      if (!confirmed) {
        return;
      }
    }

    // Status logic based on role and context
    let status = formData.status;
    if (!editingJob) {
      // Adding new job
      status = user?.role === "USER" ? "Pending" : formData.status;
    }

    const jobData = {
      ...formData,
      status,
      user: editingJob ? editingJob.user : user?.username || "",
      id: editingJob ? editingJob.id : Date.now(),
      applied_date: editingJob
        ? editingJob.applied_date
        : new Date().toISOString().split("T")[0],
    };

    try {
      if (editingJob) {
        await updateJob(editingJob.id, jobData);
        setJobs(jobs.map((job) => (job.id === editingJob.id ? jobData : job)));
        toast.success("Job updated successfully!");
      } else {
        await createJob(jobData);
        setJobs([...jobs, jobData]);
        toast.success("Job added successfully!");
      }

      setFormData({
        name: "",
        phone_number: "",
        email: "",
        company: "",
        position: "",
        status: user?.role === "USER" ? "Pending" : "Accepted",
        notes: "",
        user: user?.username || "",
      });
      setEditingJob(null);
      navigate("/");
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error(
        editingJob
          ? "Failed to update job. Please try again."
          : "Failed to add job. Please try again."
      );
    }
  };

  const handleCancel = async () => {
    const hasChanges = editingJob
      ? formData.name !== (editingJob.name || "") ||
        formData.phone_number !== (editingJob.phone_number || "") ||
        formData.email !== (editingJob.email || "") ||
        formData.company !== editingJob.company ||
        formData.position !== editingJob.position ||
        formData.status !== editingJob.status ||
        formData.notes !== (editingJob.notes || "")
      : formData.name.trim() !== "" ||
        formData.phone_number.trim() !== "" ||
        formData.email.trim() !== "" ||
        formData.company.trim() !== "" ||
        formData.position.trim() !== "" ||
        formData.status !== (user?.role === "USER" ? "Pending" : "Accepted") ||
        formData.notes.trim() !== "";

    if (hasChanges) {
      const confirmed = await confirm({
        title: "Discard Changes",
        message: "Are you sure you want to discard your changes?",
        type: "warning",
      });

      if (!confirmed) {
        return;
      }
    }

    setFormData({
      name: "",
      phone_number: "",
      email: "",
      company: "",
      position: "",
      status: user?.role === "USER" ? "Pending" : "Accepted",
      notes: "",
      user: user?.username || "",
    });
    setEditingJob(null);
    navigate("/");
  };

  return (
    <div
      className={`flex-1 flex items-center justify-center p-4 min-h-full transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-lg shadow-lg p-6 md:p-8 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-800 border border-gray-700"
            : "bg-gray-50 border border-gray-200"
        }`}
      >
        <div className="mb-6">
          <h1
            className={`text-2xl md:text-3xl font-bold text-center mb-2 ${
              theme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {editingJob ? "Edit Job" : "Add New Job"}
          </h1>
          <p
            className={`text-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {editingJob
              ? "Update your job application details"
              : "Track your job applications"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Warning message for non-editable jobs */}
          {editingJob && !canEditJob() && (
            <div
              className={`rounded-lg p-4 border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-yellow-900 border-yellow-700"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-yellow-300" : "text-yellow-400"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-yellow-200" : "text-yellow-800"
                    }`}
                  >
                    This job has been {editingJob.status.toLowerCase()} and
                    cannot be edited. You can only delete it.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info message for admin editing user's job */}
          {editingJob &&
            user?.role === "ADMIN" &&
            editingJob.user !== user?.username && (
              <div
                className={`rounded-lg p-4 border transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-blue-900 border-blue-700"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className={`h-5 w-5 ${
                        theme === "dark" ? "text-blue-300" : "text-blue-400"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-blue-200" : "text-blue-800"
                      }`}
                    >
                      You are editing a user's job application. As an admin, you
                      can only modify the status.
                    </p>
                  </div>
                </div>
              </div>
            )}
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!canEditField("name")}
              placeholder="e.g. Cao Quang Thuc"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.name ? "border-red-500" : "border-gray-300"
              } ${
                !canEditField("name")
                  ? "bg-gray-100 text-gray-500"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone_number"
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Phone *
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={!canEditField("phone_number")}
              placeholder="e.g. 0123456789"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } ${
                !canEditField("phone_number")
                  ? "bg-gray-100 text-gray-500"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!canEditField("email")}
              placeholder="e.g. caoquangthuc@gmail.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              } ${
                !canEditField("email")
                  ? "bg-gray-100 text-gray-500"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          {/* Company Field */}
          <div>
            <label
              htmlFor="company"
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled={!canEditField("company")}
              placeholder="e.g. LG CNS"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.company ? "border-red-500" : "border-gray-300"
              } ${
                !canEditField("company")
                  ? "bg-gray-100 text-gray-500"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Position Field */}
          <div>
            <label
              htmlFor="position"
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Position *
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              disabled={!canEditField("position")}
              placeholder="e.g. Frontend Developer"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.position ? "border-red-500" : "border-gray-300"
              } ${
                !canEditField("position")
                  ? "bg-gray-100 text-gray-500"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          {/* Status Field */}
          <div>
            <label
              htmlFor="status"
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Status
            </label>
            {user?.role === "USER" ? (
              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                disabled
                className={`w-full px-4 py-3 border rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-400"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
              />
            ) : (
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={!canEditField("status")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                  theme === "dark"
                    ? !canEditField("status")
                      ? "bg-gray-700 border-gray-600 text-gray-400"
                      : "bg-gray-800 border-gray-600 text-gray-100"
                    : !canEditField("status")
                    ? "bg-gray-100 border-gray-300 text-gray-500"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            )}
          </div>

          {/* Notes Field */}
          <div>
            <label
              htmlFor="notes"
              className={`block text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              disabled={!canEditField("notes")}
              rows="4"
              placeholder="e.g. Interview scheduled next Monday..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical transition-colors ${
                !canEditField("notes")
                  ? theme === "dark"
                    ? "bg-gray-700 text-gray-400 border-gray-600"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                  : theme === "dark"
                  ? "bg-gray-800 text-gray-100 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={editingJob && !canEditJob()}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors focus:ring-2 focus:ring-offset-2 ${
                editingJob && !canEditJob()
                  ? theme === "dark"
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : theme === "dark"
                  ? "bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-indigo-500"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
              }`}
            >
              {editingJob ? "Update Job" : "Submit Job"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors focus:ring-2 focus:ring-offset-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500"
              }`}
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