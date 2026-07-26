import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CoordinatorLogin from './pages/CoordinatorLogin'
import ProfileCompletionPage from './pages/ProfileCompletionPage'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/coordinator/login" element={<CoordinatorLogin />} />
      <Route path="/profile/complete" element={<ProfileCompletionPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
    </Routes>
  )
}

export default App
