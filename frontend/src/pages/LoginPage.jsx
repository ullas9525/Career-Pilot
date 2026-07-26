import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup, getMe } from '../api/endpoints'
import { setToken } from '../api/client'

export default function LoginPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function navigateAfterLogin() {
    try {
      const { data } = await getMe()
      if (data.profile_completed) {
        navigate('/dashboard')
      } else {
        navigate('/profile/complete', { state: { email: data.email } })
      }
    } catch {
      navigate('/dashboard')
    }
  }

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [collegeCode, setCollegeCode] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await login(loginEmail, loginPassword)
      setToken(data.access_token)
      await navigateAfterLogin()
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await signup(signupEmail, signupPassword)
      setToken(data.access_token)
      const { data: profile } = await getMe()
      if (profile.profile_completed) {
        navigate('/dashboard')
      } else {
        navigate('/profile/complete', { state: { email: profile.email } })
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const tabStyle = (active) =>
    `flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all duration-200 ${
      active
        ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
        : 'text-on-surface-variant hover:text-primary'
    }`

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface antialiased overflow-x-hidden"
      style={{
        background: '#faf9fb',
        backgroundImage: `
          radial-gradient(at 0% 0%, hsla(220,100%,94%,1) 0, transparent 50%),
          radial-gradient(at 100% 100%, hsla(180,100%,92%,1) 0, transparent 50%),
          radial-gradient(at 50% 50%, hsla(240,100%,98%,1) 0, transparent 80%)
        `,
        backgroundAttachment: 'fixed',
      }}
    >
      <nav className="w-full top-0 sticky z-50 bg-white/60 backdrop-blur-[20px] border-b border-white/40 shadow-sm">
        <div className="flex justify-between items-center px-5 md:px-[64px] py-4 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            <span className="text-[24px] font-bold text-primary" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Career Pilot</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-white/50 transition-colors duration-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-5 md:p-6 relative z-10">
        <div className="w-full max-w-[440px] rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 32px 0 rgba(0,76,205,0.05), inset 0 1px 0 0 rgba(255,255,255,1)',
          }}
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <h1 className="text-[32px] leading-[40px] font-semibold text-on-surface mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-[16px] leading-[24px] text-on-surface-variant">
              {tab === 'login' ? 'Continue your career journey.' : 'Start your AI guided interview prep.'}
            </p>
          </div>

          <div className="flex p-1 mb-8 rounded-xl relative z-10"
            style={{
              background: 'rgba(245,243,245,0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.4)',
            }}
          >
            <button className={tabStyle(tab === 'login')} onClick={() => { setTab('login'); setError('') }}>
              Login
            </button>
            <button className={tabStyle(tab === 'signup')} onClick={() => { setTab('signup'); setError('') }}>
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-container/50 text-[14px] text-on-error-container relative z-10">
              {error}
            </div>
          )}

          {tab === 'login' ? (
            <form className="space-y-5 relative z-10" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label className="text-[12px] leading-[16px] font-semibold text-on-surface-variant ml-1 block">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-[16px] text-on-surface placeholder:text-outline/60"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(195,198,216,0.4)',
                    }}
                    placeholder="name@university.edu"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.9)'
                      e.target.style.borderColor = 'rgba(0,76,205,0.3)'
                      e.target.style.boxShadow = '0 0 0 4px rgba(0,76,205,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.5)'
                      e.target.style.borderColor = 'rgba(195,198,216,0.4)'
                      e.target.style.boxShadow = 'none'
                    }}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[12px] leading-[16px] font-semibold text-on-surface-variant block">Password</label>
                  <a className="text-[12px] leading-[16px] font-semibold text-primary hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-[16px] text-on-surface placeholder:text-outline/60"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(195,198,216,0.4)',
                    }}
                    placeholder="••••••••"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.9)'
                      e.target.style.borderColor = 'rgba(0,76,205,0.3)'
                      e.target.style.boxShadow = '0 0 0 4px rgba(0,76,205,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.5)'
                      e.target.style.borderColor = 'rgba(195,198,216,0.4)'
                      e.target.style.boxShadow = 'none'
                    }}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-label-md text-[14px] py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #0052dd 0%, #0f62fe 100%)',
                  boxShadow: '0 4px 14px 0 rgba(15,98,254,0.25)',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          ) : (
            <form className="space-y-5 relative z-10" onSubmit={handleSignup}>
              <div className="space-y-1.5">
                <label className="text-[12px] leading-[16px] font-semibold text-on-surface-variant ml-1 block">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-[16px] text-on-surface placeholder:text-outline/60"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(195,198,216,0.4)',
                    }}
                    placeholder="name@university.edu"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.9)'
                      e.target.style.borderColor = 'rgba(0,76,205,0.3)'
                      e.target.style.boxShadow = '0 0 0 4px rgba(0,76,205,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.5)'
                      e.target.style.borderColor = 'rgba(195,198,216,0.4)'
                      e.target.style.boxShadow = 'none'
                    }}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] leading-[16px] font-semibold text-on-surface-variant ml-1 block">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-[16px] text-on-surface placeholder:text-outline/60"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(195,198,216,0.4)',
                    }}
                    placeholder="Create a password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.9)'
                      e.target.style.borderColor = 'rgba(0,76,205,0.3)'
                      e.target.style.boxShadow = '0 0 0 4px rgba(0,76,205,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.5)'
                      e.target.style.borderColor = 'rgba(195,198,216,0.4)'
                      e.target.style.boxShadow = 'none'
                    }}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] leading-[16px] font-semibold text-on-surface-variant ml-1 block">
                  College Code <span className="text-outline/60 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">school</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-[16px] text-on-surface placeholder:text-outline/60 uppercase"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(195,198,216,0.4)',
                    }}
                    placeholder="e.g. STANFORD-24"
                    type="text"
                    value={collegeCode}
                    onChange={(e) => setCollegeCode(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.9)'
                      e.target.style.borderColor = 'rgba(0,76,205,0.3)'
                      e.target.style.boxShadow = '0 0 0 4px rgba(0,76,205,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.5)'
                      e.target.style.borderColor = 'rgba(195,198,216,0.4)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-label-md text-[14px] py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #0052dd 0%, #0f62fe 100%)',
                  boxShadow: '0 4px 14px 0 rgba(15,98,254,0.25)',
                }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
                <span className="material-symbols-outlined text-[18px]">person_add</span>
              </button>
            </form>
          )}

          <div className="relative my-8 z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
