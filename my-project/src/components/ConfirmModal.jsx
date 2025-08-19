import React from "react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = "danger",
  theme = localStorage.getItem("theme") || "light",
}) => {
  if (!isOpen) return null;

  const getButtonStyles = () => {
    switch (type) {
      case "danger":
        return theme === "dark"
          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
          : "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      case "warning":
        return theme === "dark"
          ? "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
          : "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500";
      case "success":
        return theme === "dark"
          ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
          : "bg-green-600 hover:bg-green-700 focus:ring-green-500";
      default:
        return theme === "dark"
          ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "danger":
        return theme === "dark" ? "text-red-400" : "text-red-600";
      case "warning":
        return theme === "dark" ? "text-yellow-400" : "text-yellow-600";
      case "success":
        return theme === "dark" ? "text-green-400" : "text-green-600";
      default:
        return theme === "dark" ? "text-indigo-400" : "text-indigo-600";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "danger":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "success":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-colors ${
          theme === "dark" ? "bg-black/70" : "bg-black/50"
        }`}
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4">
        <div
          className={`rounded-lg shadow-2xl border max-w-md w-full mx-4 transform transition-all ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconColor()}`}
              >
                {getIcon()}
              </div>
              <div className="ml-4">
                <h3
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {title}
                </h3>
              </div>
            </div>

            <div className="mb-6">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:justify-end">
              <button
                onClick={onCancel}
                className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  theme === "dark"
                    ? "text-gray-200 bg-gray-700 border-gray-600 hover:bg-gray-600 focus:ring-gray-500"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${getButtonStyles()}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
