import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/StudentLogin';
import CoordinatorLogin from './pages/CoordinatorLogin';
import StudentDashboard from './pages/StudentDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import MockInterview from './pages/MockInterview';
import InterviewSession from './pages/InterviewSession';
import ResultPage from './pages/ResultPage';
import History from './pages/History';
import Leaderboard from './pages/Leaderboard';
import InterviewProcess from './pages/InterviewProcess';
import Cohort from './pages/Cohort';
import Settings from './pages/Settings';
import PostInterview from './pages/PostInterview';
import CoordinatorGroups from './pages/CoordinatorGroups';
import CoordinatorOutcomes from './pages/CoordinatorOutcomes';
import CoordinatorProgress from './pages/CoordinatorProgress';
import StudentProfile from './pages/StudentProfile';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/coordinator" element={<CoordinatorLogin />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        
        {/* Student Routes */}
        <Route element={<Layout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/history" element={<History />} />
          <Route path="/student/interview-process" element={<InterviewProcess />} />
          <Route path="/student/mock-interview" element={<MockInterview />} />
          <Route path="/student/interview-session" element={<InterviewSession />} />
          <Route path="/student/result" element={<ResultPage />} />
          <Route path="/student/cohort" element={<Cohort />} />
          <Route path="/student/leaderboard" element={<Leaderboard />} />
          <Route path="/student/settings" element={<Settings />} />
          <Route path="/student/post-interview" element={<PostInterview />} />
        </Route>

        {/* Coordinator Routes */}
        <Route element={<Layout />}>
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
          <Route path="/coordinator/groups" element={<CoordinatorGroups />} />
          <Route path="/coordinator/leaderboard" element={<Leaderboard />} />
          <Route path="/coordinator/outcomes" element={<CoordinatorOutcomes />} />
          <Route path="/coordinator/progress" element={<CoordinatorProgress />} />
          <Route path="/coordinator/settings" element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
