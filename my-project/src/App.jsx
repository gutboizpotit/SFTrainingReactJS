import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Settings from './pages/Settings'
import { fetchJobs } from './api/JobAPI'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editingJob, setEditingJob] = useState(null)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      const jobsData = await fetchJobs()
      setJobs(jobsData)
    }

    getJobs()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            jobs={jobs}
            setJobs={setJobs}
            setActiveTab={setActiveTab}
            setEditingJob={setEditingJob}
          />
        )
      case 'addJob':
        return (
          <AddJob
            jobs={jobs}
            setJobs={setJobs}
            setActiveTab={setActiveTab}
            editingJob={editingJob}
            setEditingJob={setEditingJob}
          />
        )
      case 'settings':
        return <Settings />
      default:
        return (
          <Dashboard
            jobs={jobs}
            setJobs={setJobs}
            setActiveTab={setActiveTab}
            setEditingJob={setEditingJob}
          />
        )
    }
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  )
}

export default App