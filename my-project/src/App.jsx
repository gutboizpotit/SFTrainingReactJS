import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import { fetchJobs } from "./api/JobAPI";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const getJobs = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
    };
    getJobs();
  }, []);

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
              />
            }
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
