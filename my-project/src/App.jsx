import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Settings from './pages/Settings'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editingJob, setEditingJob] = useState(null)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      position: 'Frontend Developer',
      company: 'Acme Corp',
      status: 'Applied',
      appliedDate: '2025-08-01',
      notes: 'Great company culture, flexible working hours'
    },
    {
      id: 2,
      position: 'Backend Engineer',
      company: 'Tech Solutions',
      status: 'Rejected',
      appliedDate: '2025-07-25',
      notes: 'Technical interview was challenging'
    },
    {
      id: 3,
      position: 'Full Stack Developer',
      company: 'StartupXYZ',
      status: 'Interview',
      appliedDate: '2025-08-05',
      notes: 'Second round interview scheduled for next week'
    }
  ])

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