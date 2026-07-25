import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CoordinatorLogin from './pages/CoordinatorLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/coordinator/login" element={<CoordinatorLogin />} />
    </Routes>
  )
}

export default App
