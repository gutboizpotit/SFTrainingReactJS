import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import { fetchJobs } from "./api/JobAPI";
import { Toaster } from "react-hot-toast";
import ConfirmModal from "./components/ConfirmModal";
import { useConfirm } from "./hooks/useConfirm";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const { confirmState, confirm } = useConfirm();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const getJobs = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
    };
    if (user) getJobs();
  }, [user,jobs]);

  useEffect(() => {
    if (location.pathname !== "/add-job") {
      setEditingJob(null);
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route
              index
              path="/"
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
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        type={confirmState.type}
        onConfirm={confirmState.onConfirm}
        onCancel={confirmState.onCancel}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
