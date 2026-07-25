import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/endpoints'
import { setToken } from '../api/client'

export default function CoordinatorLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [collegeCode, setCollegeCode] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await login(email, password)
      setToken(data.access_token)
      navigate('/coordinator/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center antialiased"
      style={{
        backgroundImage: `
          radial-gradient(at 10% 20%, hsla(224,100%,94%,1) 0px, transparent 50%),
          radial-gradient(at 80% 90%, hsla(224,100%,90%,1) 0px, transparent 50%),
          radial-gradient(at 90% 10%, hsla(180,100%,94%,1) 0px, transparent 50%)
        `,
        backgroundColor: '#faf9fb',
      }}
    >
      <main className="w-full max-w-[480px] px-4">
        <div className="rounded-xl p-8 md:p-10 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 32px rgba(0,76,205,0.08)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.8)', mixBlendMode: 'overlay' }} />

          <div className="flex flex-col items-center mb-8 text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#dbe1ff] flex items-center justify-center mb-4 shadow-sm border border-white">
              <span className="material-symbols-outlined text-primary text-[32px]">admin_panel_settings</span>
            </div>
            <h1 className="text-[32px] leading-[40px] font-semibold mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#00174c' }}>
              Coordinator Access
            </h1>
            <p className="text-[16px] leading-[24px] text-on-surface-variant">
              Manage your placement groups and track student readiness.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-container/50 text-[14px] text-on-error-container relative z-10">
              {error}
            </div>
          )}

          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[14px] font-medium text-on-surface mb-2" htmlFor="email">Work Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                <input
                  className="w-full border border-outline-variant/30 rounded-lg py-3 pl-10 pr-4 text-[16px] text-on-surface outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                  id="email"
                  placeholder="name@college.edu"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.background = 'white'
                    e.target.style.borderColor = '#004ccd'
                    e.target.style.boxShadow = '0 0 0 2px #dbe1ff'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.5)'
                    e.target.style.borderColor = 'rgba(195,198,216,0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[14px] font-medium text-on-surface" htmlFor="password">Password</label>
                <a className="text-[12px] font-semibold text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                <input
                  className="w-full border border-outline-variant/30 rounded-lg py-3 pl-10 pr-4 text-[16px] text-on-surface outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.background = 'white'
                    e.target.style.borderColor = '#004ccd'
                    e.target.style.boxShadow = '0 0 0 2px #dbe1ff'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.5)'
                    e.target.style.borderColor = 'rgba(195,198,216,0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-on-surface mb-2" htmlFor="college_code">College Code</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">domain</span>
                <input
                  className="w-full border border-outline-variant/30 rounded-lg py-3 pl-10 pr-4 text-[16px] text-on-surface outline-none transition-all uppercase placeholder:lowercase"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                  id="college_code"
                  placeholder="e.g. ENG2024"
                  type="text"
                  value={collegeCode}
                  onChange={(e) => setCollegeCode(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.background = 'white'
                    e.target.style.borderColor = '#004ccd'
                    e.target.style.boxShadow = '0 0 0 2px #dbe1ff'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.5)'
                    e.target.style.borderColor = 'rgba(195,198,216,0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 text-white font-label-md text-[14px] py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 group disabled:opacity-60"
              style={{
                background: 'linear-gradient(to right, #004ccd, #0052dd)',
                boxShadow: '0 4px 14px rgba(0,76,205,0.25)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In as Coordinator'}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          <div className="flex items-center my-6 gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(195,198,216,0.4)' }} />
            <div className="flex-1 h-px" style={{ background: 'rgba(195,198,216,0.4)' }} />
          </div>

          <div className="text-center">
            <a className="text-[12px] font-semibold text-primary hover:underline" href="#">Request demo access</a>
          </div>
        </div>

        <div className="text-center mt-6 flex justify-center gap-6">
          <a className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
        <p className="text-center text-[12px] font-semibold text-outline mt-2">&copy; 2024 Career Pilot AI. All rights reserved.</p>
      </main>
    </div>
  )
}
