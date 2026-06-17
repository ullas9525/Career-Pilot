import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export default function StudentLogin() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCollege, setSignupCollege] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/student/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Login failed');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email: signupEmail,
        password: signupPassword,
        college_code: signupCollege,
        role: 'student'
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/student/profile');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container/20 selection:text-primary" style={{
      backgroundColor: '#faf9fb',
      backgroundImage: `
        radial-gradient(at 0% 0%, hsla(220,100%,94%,1) 0, transparent 50%), 
        radial-gradient(at 100% 100%, hsla(180,100%,92%,1) 0, transparent 50%),
        radial-gradient(at 50% 50%, hsla(240,100%,98%,1) 0, transparent 80%)
      `,
      backgroundAttachment: 'fixed'
    }}>
      {/* TopNavBar (Transactional/Minimal) */}
      <nav className="w-full top-0 sticky z-50 bg-white/60 dark:bg-black/60 backdrop-blur-[20px] border-b border-white/40 dark:border-white/10 shadow-sm transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">Career Pilot</span>
          </Link>
          {/* Trailing Actions */}
          <div className="flex items-center gap-4">
            <button aria-label="Toggle Dark Mode" className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-white/50 transition-colors duration-200">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Auth Content */}
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-gutter relative z-10">
        {/* Glassmorphic Auth Card */}
        <div className="w-full max-w-[440px] glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Decorative ambient glow inside card */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              {tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {tab === 'login' ? 'Continue your career journey.' : 'Start your AI guided interview prep.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 mb-8 bg-surface-container-low/50 rounded-xl backdrop-blur-sm border border-white/40 relative z-10">
            <button 
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all duration-200 ${
                tab === 'login' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-on-surface-variant hover:text-primary bg-transparent shadow-none ring-0'
              }`}>
              Login
            </button>
            <button 
              onClick={() => setTab('signup')}
              className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all duration-200 ${
                tab === 'signup' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-on-surface-variant hover:text-primary bg-transparent shadow-none ring-0'
              }`}>
              Sign Up
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-error-container/20 border border-error/50 rounded-xl text-error text-center font-label-md">
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5 relative z-10 animate-fade-up">
              <div className="space-y-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1 block">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                  <input required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl glass-input font-body-md text-body-md text-on-surface placeholder:text-outline/60" placeholder="name@university.edu" type="email" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block">Password</label>
                  <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                  <input required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 rounded-xl glass-input font-body-md text-body-md text-on-surface placeholder:text-outline/60" placeholder="••••••••" type="password" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                  </button>
                </div>
              </div>
              <button className="w-full primary-gradient-btn text-white font-label-md text-label-md py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2" type="submit">
                Sign In
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {tab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-5 relative z-10 animate-fade-up">
              <div className="space-y-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1 block">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                  <input required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl glass-input font-body-md text-body-md text-on-surface placeholder:text-outline/60" placeholder="name@university.edu" type="email" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1 block">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                  <input required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 rounded-xl glass-input font-body-md text-body-md text-on-surface placeholder:text-outline/60" placeholder="Create a password" type="password" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1 block">College Code <span className="text-outline/60 font-normal">(Optional)</span></label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">school</span>
                  <input value={signupCollege} onChange={(e) => setSignupCollege(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl glass-input font-body-md text-body-md text-on-surface placeholder:text-outline/60 uppercase" placeholder="e.g. STANFORD-24" type="text" />
                </div>
              </div>
              <button className="w-full primary-gradient-btn text-white font-label-md text-label-md py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2" type="submit">
                Create Account
                <span className="material-symbols-outlined text-[18px]">person_add</span>
              </button>
            </form>
          )}

          {/* Social Login Divider */}
          <div className="relative my-8 z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface-variant font-label-sm text-label-sm rounded-full border border-outline-variant/20">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 relative z-10">
            <button className="glass-ghost-btn flex items-center justify-center gap-2 py-3 rounded-xl font-label-md text-label-md text-on-surface" type="button">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button className="glass-ghost-btn flex items-center justify-center gap-2 py-3 rounded-xl font-label-md text-label-md text-on-surface" type="button">
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
              LinkedIn
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
