import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import { fetchJobs } from "./api/JobAPI";
import { Toaster } from "react-hot-toast";
import ConfirmModal from "./components/ConfirmModal";
import { useConfirm } from "./hooks/useConfirm";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const { confirmState, confirm } = useConfirm();
  const location = useLocation();

  useEffect(() => {
    const getJobs = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
    };
    getJobs();
  }, []);

  // Clear editingJob when navigating away from add-job page
  useEffect(() => {
    if (location.pathname !== '/add-job') {
      setEditingJob(null);
    }
  }, [location.pathname]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Dashboard
                jobs={jobs}
                setJobs={setJobs}
                setEditingJob={setEditingJob}
                confirm={confirm}
              />
            }
          />
          <Route
            path="add-job"
            element={
              <AddJob
                jobs={jobs}
                setJobs={setJobs}
                editingJob={editingJob}
                setEditingJob={setEditingJob}
                confirm={confirm}
              />
            }
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        type={confirmState.type}
        onConfirm={confirmState.onConfirm}
        onCancel={confirmState.onCancel}
      />
    </Router>
  );
}

export default App;
