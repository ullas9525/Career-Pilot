import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../api/endpoints'
import { clearToken } from '../api/client'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then(({ data }) => setUser(data))
      .catch(() => { clearToken(); navigate('/login') })
      .finally(() => setLoading(false))
  }, [])

  function logout() {
    clearToken()
    navigate('/login')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-on-surface-variant">Loading...</div>

  return (
    <div className="text-on-surface antialiased min-h-screen flex" style={{
      background: 'radial-gradient(circle at top right, rgba(110,243,243,0.1), transparent 40%), radial-gradient(circle at bottom left, rgba(0,76,205,0.05), transparent 40%)',
      backgroundColor: '#faf9fb',
    }}>
      {/* Sidebar */}
      <nav className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 p-4 gap-2 z-50 border-r border-white/40 shadow-md"
        style={{ background: 'rgba(245,243,245,0.8)', backdropFilter: 'blur(30px)' }}
      >
        <div className="flex items-center gap-3 mb-8 px-2 mt-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg, #004ccd, #6ef3f3)' }}>
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
          </div>
          <div>
            <h1 className="font-bold text-primary text-lg" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Career Pilot</h1>
            <p className="text-[12px] text-on-surface-variant">AI Interview Engine</p>
          </div>
        </div>

        <button className="w-full py-3 mb-6 text-white rounded-xl flex items-center justify-center gap-2 text-[14px] font-medium transition-all"
          style={{
            background: 'linear-gradient(to right, #004ccd, #0052dd)',
            boxShadow: '0 4px 12px rgba(0,76,205,0.2)',
          }}
        >
          <span className="material-symbols-outlined text-[18px]">play_circle</span> Start Mock Session
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium relative overflow-hidden"
            style={{ background: 'rgba(15,98,254,0.2)', color: '#004ccd' }}>
            <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full" />
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span> Overview
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">history</span> History
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">ads_click</span> Interview Process
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">psychology</span> Mock Interview
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">assignment_turned_in</span> Post-Interview
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">groups</span> My Cohort
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">emoji_events</span> Leaderboard
          </a>
        </div>

        <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-outline-variant/30">
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">settings</span> Settings
          </a>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-on-surface-variant hover:bg-white/40 transition-colors w-full text-left">
            <span className="material-symbols-outlined">logout</span> Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 md:ml-64 px-5 md:px-6 max-w-[1280px] mx-auto w-full">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/20">
          <div>
            <h2 className="text-[32px] leading-[40px] font-semibold text-on-surface" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Hello, {user?.full_name?.split(' ')[0] || 'there'}.
            </h2>
            <p className="text-[16px] text-on-surface-variant mt-1">Your placement readiness dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative"
              style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <h3 className="text-[14px] font-medium text-on-surface-variant uppercase tracking-wider mb-2">Readiness Score</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-[48px] font-bold text-primary leading-none">0.0</span>
              <span className="text-[16px] text-outline">/ 10</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-tertiary">trending_flat</span>
              <span className="text-[12px] font-semibold text-tertiary">No data yet</span>
            </div>
          </div>
          <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <h3 className="text-[14px] font-medium text-on-surface-variant uppercase tracking-wider mb-2">Next Interview</h3>
            <p className="text-[24px] font-semibold text-on-surface truncate" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>None scheduled</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[12px] font-semibold py-1 px-2 rounded-md" style={{ background: '#efedef' }}>
                <span className="material-symbols-outlined text-[14px]">event</span> —
              </div>
            </div>
          </div>
          <div className="rounded-xl p-6 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <div>
              <h3 className="text-[14px] font-medium text-on-surface-variant uppercase tracking-wider mb-2">Practice Streak</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-[48px] font-bold text-secondary leading-none">0</span>
                <span className="text-[16px] text-outline">days</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center border"
              style={{ background: 'rgba(110,243,243,0.3)', borderColor: '#6ef3f3' }}>
              <span className="material-symbols-outlined text-[32px] text-secondary">local_fire_department</span>
            </div>
          </div>
        </section>

        {/* Score Breakdown | Skill Balance | Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Score Breakdown */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[24px] font-semibold text-on-surface" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Score Breakdown</h3>
              <span className="text-xs text-outline">Weights based on your role</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Technical Depth', weight: '40%', score: 0 },
                { label: 'Communication', weight: '20%', score: 0 },
                { label: 'Problem Solving', weight: '30%', score: 0 },
                { label: 'Culture Fit', weight: '10%', score: 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm">
                    <span>{item.label} <span className="text-xs text-outline">({item.weight})</span></span>
                    <span className="font-semibold text-primary">{item.score}.0/10</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full mt-0.5" style={{ background: '#e3e2e4' }}>
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.score * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/20 text-center text-xs text-on-surface-variant">
              Weighted total: <strong className="text-primary">0.0/10</strong>
            </div>
          </div>

          {/* Skill Balance placeholder */}
          <div className="rounded-xl p-6 flex flex-col items-center" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <h3 className="text-[24px] font-semibold text-on-surface self-start w-full mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Skill Balance</h3>
            <div className="flex-1 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-outline-variant">donut_large</span>
            </div>
            <p className="text-sm text-on-surface-variant mt-4">Complete an interview to see your skill balance</p>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl p-6 flex flex-col" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <h3 className="text-[24px] font-semibold text-on-surface mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Recent Activity</h3>
            <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant">hourglass_empty</span>
              <p className="text-[16px] text-on-surface-variant mt-2">No recent activity</p>
              <p className="text-[12px] font-semibold text-outline mt-1">Start a mock interview to see your progress here</p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-6">
          <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div>
                <h3 className="text-[24px] font-semibold text-on-surface flex items-center gap-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Next Steps
                </h3>
                <p className="text-[16px] text-on-surface-variant mt-1">Your personalised action plan will appear here after your first interview.</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">route</span>
              <p className="text-[14px] font-medium text-on-surface-variant">No plan yet</p>
              <p className="text-[12px] font-semibold text-outline mt-1 max-w-xs">Complete your first mock interview and we&apos;ll generate a personalised 14-day improvement plan for you.</p>
              <button className="mt-4 px-5 py-2.5 text-white rounded-xl text-[14px] font-medium flex items-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(to right, #004ccd, #0052dd)',
                  boxShadow: '0 4px 12px rgba(0,76,205,0.2)',
                }}
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span> Start Mock Interview
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
